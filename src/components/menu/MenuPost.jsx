import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './Menupost.css';
import { FaBars, FaTimes } from 'react-icons/fa';

function MenuPost() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const menuRef = useRef(null); // <- Aquí está bien

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (open && menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </button>

      <aside ref={menuRef} className={`menu-post ${open ? 'open' : ''}`}>
        <div className="menu-content">
          <div className="menu-user">👤 {user?.name}</div>
          <button onClick={() => navigate(`/usuarios/${user.id}`)}>Perfil</button>
          <button onClick={() => navigate(`/usuarios/${user.id}/actualizar`)}>Actualizar</button>
          <button onClick={() => navigate('/bienvenida')}>Inicio</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </aside>
    </>
  );
}

export default MenuPost;
