import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UserForm() {
  const [user, setUser] = useState({ name: '', email: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  const isNew = id === 'new';

  useEffect(() => {
    if (!isNew) {
      axios.get(`http://localhost:3000/api/users/${id}`)
        .then(res => setUser(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNew) {
      await axios.post('http://localhost:3000/api/users', user);
    } else {
      await axios.put(`http://localhost:3000/api/users/${id}`, user);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isNew ? 'Crear Usuario' : 'Editar Usuario'}</h2>
      <input name="name" value={user.name} onChange={handleChange} placeholder="Nombre" />
      <input name="email" value={user.email} onChange={handleChange} placeholder="Email" />
      <button type="submit">Guardar</button>
    </form>
  );
}

export default UserForm;
