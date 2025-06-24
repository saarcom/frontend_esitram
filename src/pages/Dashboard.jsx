//import { useNavigate } from 'react-router-dom';
/*
function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.removeItem('user'); // Borrar sesión
    navigate('/login');              // Redirigir a login
  };

  return (
    <div>
      <h2>Bienvenido, {user?.name || 'Usuario'}</h2>
      <p>Esta es una página privada.</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;
*/

// pages/Dashboard.jsx
//import React from 'react';

import MenuPost from '../components/menu/MenuPost';


import './Dashboard.css';

function Dashboard({ children }) {
  return (
    <div className="dashboard-layout">
      <MenuPost />
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}

export default Dashboard;