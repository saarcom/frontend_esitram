// MenuPost.jsx
import { useNavigate } from 'react-router-dom';
import './Menupost.css';
import { FaBars } from 'react-icons/fa';
import avatar from '../../images/avatar.png'; // Asegúrate de que la ruta sea correcta

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
          <div className="menu-user">
           
            <img
              src={avatar} // cambia esto al path real de tu imagen
              alt="Usuario"
              className="user-avatar"
            />
              <h2>{user?.name}</h2>
              <h5>{user?.email}</h5>
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
