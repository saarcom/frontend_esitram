import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import Logo from '../../src/images/logo.png';

function Header({ isOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className="main-header"
      style={{
        marginLeft: isOpen ? '220px' : '60px',
        transition: 'margin-left 0.3s ease',
      }}
    >
      <button className="logo-button">
        <img src={Logo} alt="Logo" className="logo-img" />
      </button>

      <div className="nav-actions" ref={dropdownRef}>
        <button
          className="user-icon"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FaUserCircle size={24} />
        </button>

        {dropdownOpen && (
          <div className="user-dropdown">
            <button onClick={() => alert('Ver perfil')}>👤 Perfil</button>
            <button onClick={() => alert('Configuración')}>⚙️ Configuración</button>
            <button
              onClick={() => {
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}
            >
              🔒 Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
