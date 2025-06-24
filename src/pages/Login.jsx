import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Asegúrate de que el CSS esté importado
import logo from '../images/logo.png'


function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users/login', form, {
        withCredentials: true
      });

      localStorage.setItem('user', JSON.stringify(res.data.user));
      const { role, id } = res.data.user;

      if (role === 'admin') {
        navigate(`/PerfilAdmin/${id}`);
      } else if (role === 'user') {
        navigate(`/usuarios/${id}`);
      } else {
        setError('Rol desconocido');
      }
    } catch (err) {
      setError('Credenciales incorrectas. Intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header" >
          <img src={logo} alt="Logo del sistema" className="login-logo" />
          <h2>Bienvenido al Sistema</h2>
          <p>Ingresa tus credenciales para continuar</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="usuario@ejemplo.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
             <div className="password-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? 'Ocultar' : 'Ver'}
                </button>
              </div>
            
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        <div className="login-footer">
          <p>© {new Date().getFullYear()} Tu Sistema. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
