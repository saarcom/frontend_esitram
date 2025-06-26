//import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Crearás este archivo
/*
function Sidebar({ role, userId }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <div className="sidebar-toggle">
                <button onClick={toggleSidebar}>☰</button>
            </div>

            <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
                <h3>Menú</h3>
                <ul>
                    <li><Link to={`/usuarios/${userId}`}>Inicio</Link></li>
                    <li><Link to={`/actualizar-datos/${userId}`}>Actualizar perfil</Link></li>

                    {role === 'admin' && (
                        <>
                            <li><Link to="/admin-dashboard">Dashboard Admin</Link></li>
                            <li><Link to={`/PerfilAdmin/${userId}`}>Gestión Usuarios</Link></li>
                        </>
                    )}

                    <li>
                        <button
                            onClick={() => {
                                localStorage.removeItem('user');
                                window.location.href = '/login';
                            }}
                        >
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;*/
function Sidebar({ role, userId, isOpen, onToggle }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-toggle">
        <button onClick={onToggle}>☰</button>
      </div>

      <h3 className="sidebar-title">{isOpen ? 'Menú' : ''}</h3>

      <ul>
        <li>
          <Link to={`/usuarios/${userId}`}>{isOpen ? 'Inicio' : '🏠'}</Link>
        </li>
        <li>
          <Link to={`/actualizar-datos/${userId}`}>{isOpen ? 'Actualizar perfil' : '📝'}</Link>
        </li>

        {role === 'admin' && (
          <>
            <li>
              <Link to="/admin-dashboard">{isOpen ? 'Dashboard Admin' : '📊'}</Link>
            </li>
            <li>
              <Link to={`/PerfilAdmin/${userId}`}>{isOpen ? 'Gestión Usuarios' : '👥'}</Link>
            </li>
          </>
        )}

        <li>
          <button
            className="sidebar-logout"
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
          >
            {isOpen ? 'Cerrar sesión' : '🚪'}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;