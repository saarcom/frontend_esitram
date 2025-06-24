//import React from 'react';
import './bienvenida.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function BienvenidaUsuario() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Suponiendo que el backend ya sabe quién está logueado (sesión/cookie/token)
    axios.get('http://localhost:3000/api/auth/user', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => alert('No estás autenticado'));
  }, []);

  if (!user) return <div className="cargando">Cargando datos...</div>;

  return (
    <div className="contenedor">
      <h1 className="titulo">¡Bienvenido, {user.name}!</h1>
      <p className="info">✉️ Email: {user.email}</p>
      <p className="info">🛡️ Rol: {user.role}</p>
    </div>
  );
}

export default BienvenidaUsuario;