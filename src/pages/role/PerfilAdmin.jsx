import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // necesario para accesibilidad

function PerfilAdmin() {
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:3000/api/users', { withCredentials: true })
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error('Error cargando usuarios:', err);
        alert('No tienes permiso para ver esta página');
      });
  }, []);

  const handleEdit = (userId) => {
    navigate(`/actualizar-datos/${userId}`);
  };

  const handleDelete = (userId) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      axios.delete(`http://localhost:3000/api/users/${userId}`, { withCredentials: true })
        .then(() => setUsers(users.filter(u => u.id !== userId)))
        .catch(err => {
          console.error('Error eliminando usuario:', err);
          alert('No se pudo eliminar el usuario');
        });
    }
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/users', newUser, { withCredentials: true })
      .then(res => {
        setUsers([...users, res.data]);
        setModalIsOpen(false);
        setNewUser({ name: '', email: '', password: '', role: 'user' });
      })
      .catch(err => {
        console.error('Error creando usuario:', err);
        alert('No se pudo crear el usuario');
      });
  };

  return (
    <div>
      <h2>Panel de Administración</h2>
      <p>Bienvenido Admin: ID {id}</p>

      <button onClick={() => setModalIsOpen(true)}>Crear nuevo usuario</button>

      {/* Tabla de usuarios */}
      <table border="1" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleEdit(u.id)}>Editar</button>
                <button onClick={() => handleDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para crear usuario */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Crear Usuario"
        style={{
          content: {
            width: '400px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px'
          }
        }}
      >
        <h3>Crear nuevo usuario</h3>
        <form onSubmit={handleCreateUser}>
          <input
            name="name"
            placeholder="Nombre"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            required
          /><br /><br />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            required
          /><br /><br />
          <input
            name="password"
            placeholder="Contraseña"
            type="password"
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
            required
          /><br /><br />
          <select
            name="role"
            value={newUser.role}
            onChange={e => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select><br /><br />
          <button type="submit">Crear</button>
          <button type="button" onClick={() => setModalIsOpen(false)}>Cancelar</button>
        </form>
      </Modal>
      
       <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
          >
            Cerrar sesión
          </button>
      
    </div>
  );
}

export default PerfilAdmin;
