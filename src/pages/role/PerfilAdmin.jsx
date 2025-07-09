import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import './PerfilAdmin.css'; // Asegúrate de tener un archivo CSS para estilos
//import MenuPost from '../../components/menu/MenuPost';
///import Header  from '../../components/Header';


Modal.setAppElement('#root'); // necesario para accesibilidad

function PerfilAdmin() {
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();
  const { id } = useParams();

  // 
  //const [isOpen, setIsOpen] = useState(true);
  // const toggleMenu = () => setIsOpen(!isOpen);


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
    <>




      <div className="admin-panel" >
        <header className="admin-header">
          <h2>Panel de Administración</h2>

          <p>Bienvenido Admin: ID {id}</p>
          <button className="btn-primary" onClick={() => setModalIsOpen(true)}>+ Crear Usuario</button>
        </header>

        <section className="admin-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Ap. Paterno</th>
                <th>Ap. Materno</th>
                <th>Cumpleaños</th>
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
                  <td>{u.lastnamep}</td>
                  <td>{u.lastnamem}</td>
                  <td>{u.birthdate ? new Date(u.birthdate).toLocaleDateString() : 'N/A'}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(u.id)}>Editar</button>
                    <button className="btn-delete" onClick={() => handleDelete(u.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Crear Usuario"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            },
            content: {
              maxWidth: '400px',
              margin: 'auto',
              padding: '2rem',
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            }
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Nuevo Usuario</h2>
          <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={newUser.name}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={newUser.password}
              onChange={e => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
            <select
              name="role"
              value={newUser.role}
              onChange={e => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button type="submit" style={{ flex: 1, backgroundColor: '#4299e1', color: 'white', padding: '0.6rem', borderRadius: '6px', border: 'none' }}>
                Crear
              </button>
              <button
                type="button"
                onClick={() => setModalIsOpen(false)}
                style={{ flex: 1, backgroundColor: '#e53e3e', color: 'white', padding: '0.6rem', borderRadius: '6px', border: 'none' }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </Modal>

        <footer className="admin-footer">
          <button className="btn-logout" onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}>Cerrar sesión</button>
        </footer>
      </div>


    </>

  );

}

export default PerfilAdmin;
