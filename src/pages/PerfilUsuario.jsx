import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MenuPost from '../components/menu/MenuPost';
import './PerfilUsuario.css';

function PerfilUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(true); // <<-- Nuevo estado para el menú

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/users/${id}`, { withCredentials: true })
            .then(res => {
                setUser(res.data);

                // Redireccionar según rol:
                if (res.data.role === 'admin') {
                    navigate('/admin-dashboard');
                } else if (res.data.role === 'usuario') {
                    navigate(`/usuario-dashboard/${res.data.id}`);
                }
            })
            .catch(err => {
                console.error('Error cargando perfil:', err);
                alert('No tienes permiso para ver esta página');
            });

            
    }, [id, navigate]);

    if (!user) return <div>Cargando perfil...</div>;

    return (
        <div className="perfil-layout" style={{ display: 'flex' }}>
            {/* Menú lateral con control del estado */}
            <MenuPost isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />

            {/* Contenido ajustado dinámicamente */}
            <div
                className="perfil-content"
                style={{
                    marginLeft: isMenuOpen ? '220px' : '60px',
                    transition: 'margin-left 0.3s ease',
                    flex:1,
                    padding: '20px'
                }}
            >
                <section className="perfil-info">
                    <h2>Bienvenido, <span>{user.name}</span></h2>
                    <p><strong>Correo:</strong> {user.email}</p>
                    <p><strong>Rol:</strong> {user.role}</p>
                </section>

                <section className="perfil-actions">
                    <button onClick={() => navigate(`/actualizar-datos/${user.id}`)}>
                        Ir a actualización de datos
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem('user');
                            window.location.href = '/login';
                        }}
                    >
                        Cerrar sesión
                    </button>
                </section>
            </div>
        </div>
    );
}

export default PerfilUsuario;
