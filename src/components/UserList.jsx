import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:3000/api/users');
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/api/users/${id}`);
    fetchUsers(); // Recargar lista
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <Link to="/edit/new">Crear nuevo usuario</Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <Link to={`/edit/${user.id}`}>Editar</Link>
            <button onClick={() => deleteUser(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
