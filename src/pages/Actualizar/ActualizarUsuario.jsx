import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ActualizarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/users/${id}`, { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => alert('Error al cargar datos'));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const dataToUpdate = { ...user };
    if (!dataToUpdate.password) delete dataToUpdate.password;

    axios.put(`http://localhost:3000/api/users/${id}`, dataToUpdate, { withCredentials: true })
      .then(() => {
        alert('Datos actualizados correctamente');
        navigate(`/PerfilAdmin/${id}`);
      })
      .catch(() => alert('Error al actualizar'));
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={user.name} onChange={handleChange} required />
        <input name="email" value={user.email} onChange={handleChange} required />
        <input name="password" type="password" onChange={handleChange} placeholder="Nueva contraseña" />
        <input name="role" value={user.role} onChange={handleChange} required />
        <button type="submit">Guardar Cambios</button>
{/* Botón para volver atrás */}
        <button type="button" onClick={() => navigate(-1)}>
        Volver Atrás
        </button>
        
      </form>

    </div>
    
  );
}

export default ActualizarUsuario;
