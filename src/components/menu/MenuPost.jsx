// MenuPost.jsx
import { useNavigate } from 'react-router-dom';
import './Menupost.css';
import { FaBars } from 'react-icons/fa';
import avatar from '../../images/avatar.png'; // Asegúrate de que la ruta sea correcta
import { IoExitOutline } from "react-icons/io5";
import logo from '../../images/logo.png';

function MenuPost({ isOpen, toggleMenu }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <button className="menu-toggle" onClick={toggleMenu}>
        {isOpen ? <FaBars /> : <FaBars />}
      </button>

      <aside className={`menu-post ${isOpen ? '' : 'closed'}`}>
        <div className="menu-content">
          <div className='menu-logo'>
            <img className="logo-image" src={logo} alt="logo eSitram" />
          </div>
          <div className="menu-user">

            <img
              src={avatar} // cambia esto al path real de tu imagen
              alt="Usuario"
              className="user-avatar"
            />
            <div className="icono-con-tooltip">
              <IoExitOutline
                style={{ fontSize: "24px", color: "#555", cursor: "pointer" }}
                onClick={() => {
                  localStorage.removeItem('user');
                  window.location.href = '/login';
                }}
              />
              <span className="tooltip">Cerrar sesión</span> {/* Mensaje emergente */}
            </div>
            <h6>Actuante Sitram</h6>
            <h2>{user?.name}</h2>
            <h5>{user?.email}</h5>

          </div>
          <div>

          </div>


          {/* Botones visibles para todos */}
          <button onClick={() => navigate(`/usuarios/${user.id}`)}>Perfil</button>
          <button onClick={() => navigate(`/usuarios/${user.id}/actualizar`)}>Actualizar</button>
          <button onClick={() => navigate('/bienvenida')}>Inicio</button>

          {/* Solo para ADMIN */}
          {user?.role === 'admin' && (
            <>
              <button onClick={() => navigate(`/PerfilAdmin/${user.id}`)}>Admin Panel</button>
              <button onClick={() => navigate('/usuarios')}>Gestión de Usuarios</button>
            </>
          )}

          {/* Solo para USER */}
          {user?.role === 'user' && (
            <>
              <button onClick={() => navigate('/mis-datos')}>Mis Datos</button>
              <button onClick={() => navigate('/ayuda')}>Ayuda</button>
            </>
          )}

          {/* Cerrar sesión */}
          <button
            onClick={() => {
              localStorage.removeItem('user');
              navigate('/login');
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}

export default MenuPost;
