import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
//import MenuPost from '../components/menu/MenuPost';
import './PerfilUsuario.css';


import Alert from '@mui/material/Alert'; // Importa Alert correctamente
import CheckIcon from '@mui/icons-material/Check'; // Importa CheckIcon correctamente


function PerfilUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    //const [isMenuOpen, setIsMenuOpen] = useState(true); // <<-- Nuevo estado para el menú
    const [showWelcome, setShowWelcome] = useState(false); // 👈 nuevo estado

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/users/${id}`, { withCredentials: true })
            .then(res => {
                setUser(res.data);

                // Mostrar alerta de bienvenida por 3 segundos
                setShowWelcome(true);
                setTimeout(() => setShowWelcome(false), 3000);


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

        <div


            className="perfil-content" >

            {/* ALERTA DE BIENVENIDA */}

            {showWelcome && (
                <Alert
                    variant="filled"
                    icon={<CheckIcon fontSize="inherit" />}
                    severity="success" // Puedes cambiarlo a: error, warning, info, success
                    sx={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        zIndex: 9999,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        borderRadius: '8px',
                        width: { xs: '80%', sm: '350px' }, // Responsive
                        maxWidth: '400px',
                        // Personalización de colores:
                        backgroundColor: '#f869bf;', // Color de fondo
                        color: 'white', // Color del texto
                        '& .MuiAlert-icon': { // Estilo del ícono
                            color: 'white',
                            fontSize: '28px'
                        },
                        '& .MuiAlert-message': { // Estilo del mensaje
                            fontSize: '16px',
                            fontWeight: '500'
                        },
                        // Animación de entrada:
                        animation: 'fadeIn 0.5s ease-in-out',
                        '@keyframes fadeIn': {
                            '0%': { opacity: 0, transform: 'translateY(-20px)' },
                            '100%': { opacity: 1, transform: 'translateY(0)' }
                        }
                    }}
                >


                    ¡Bienvenido {user.name}!
                </Alert>
            )}



            <section className="perfil-info">
                <h2>Bienvenido: <span>{user.name}</span></h2>
                <p><strong>Apellido Paterno :</strong> {user.lastnamep}</p>
                <p><strong>Apellido materno :</strong> {user.lastnamem}</p>
                <p><strong>Fecha de cumpleaños :</strong> {user.birthdate}</p>

                <p><strong>Correo :</strong> {user.email}</p>
                <p><strong>Rol  :</strong> {user.role}</p>
            </section>

            {/* Tarjetas */}
            <div className="summary-cards">
                <div className="card danger">⚠️<strong>Por recibir</strong><p>0</p></div>
                <div className="card warning">✅<strong>Recibidos</strong><p>0</p></div>
                <div className="card info">↩<strong>Revertidos</strong><p>0</p></div>
                <div className="card total">📄<strong>Total trámites</strong><p>0</p></div>
                <div className="card success">📤<strong>Enviados</strong><p>0</p></div>
            </div>

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

    );
}

export default PerfilUsuario;
