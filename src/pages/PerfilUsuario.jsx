import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './PerfilUsuario.css';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';

// Importación de íconos
import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import Edit from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import People from '@mui/icons-material/People';
import Assessment from '@mui/icons-material/Assessment';
import Settings from '@mui/icons-material/Settings';

function PerfilUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showWelcome, setShowWelcome] = useState(false);
    const [permisos, setPermisos] = useState([]);
    const [loadingPermiso, setLoadingPermiso] = useState(null);
    const [errorPermiso, setErrorPermiso] = useState(null);

    // Mapeo de permisos a rutas
    const permisoRoutes = {
        'admin_panel': '/admin/dashboard',
        'edit_profile': `/edit-profile/${id}`,
        'view_reports': '/reports',
        'manage_users': '/user-management',
        'create_content': '/content/create',
        'system_settings': '/settings/system'
    };

    // Función para determinar el tipo de permiso
    const getPermisoType = (permiso) => {
        if (permiso.includes('admin')) return 'admin';
        if (permiso.includes('edit')) return 'edit';
        if (permiso.includes('view')) return 'view';
        if (permiso.includes('manage')) return 'manage';
        if (permiso.includes('report')) return 'report';
        return 'default';
    };

    // Función para obtener el ícono correspondiente
    const getPermisoIcon = (permiso) => {
        switch(getPermisoType(permiso)) {
            case 'admin': return <AdminPanelSettings className="permiso-icon" />;
            case 'edit': return <Edit className="permiso-icon" />;
            case 'view': return <Visibility className="permiso-icon" />;
            case 'manage': return <People className="permiso-icon" />;
            case 'report': return <Assessment className="permiso-icon" />;
            default: return <Settings className="permiso-icon" />;
        }
    };

    // Función para formatear el nombre del permiso
    const formatPermisoName = (permiso) => {
        return permiso
            .replace(/_/g, ' ')
            .replace(/(^|\s)\S/g, l => l.toUpperCase());
    };

    // Función para manejar el clic en un permiso con validación
const handlePermisoClick = async (permiso) => {
    setLoadingPermiso(permiso);
    setErrorPermiso(null);
    
    try {
        // Verificación local como fallback
        if (permisos.includes(permiso)) {
            const route = permisoRoutes[permiso];
            if (route) {
                navigate(route);
            } else {
                setErrorPermiso(`No hay ruta configurada para: ${permiso}`);
                
            }
        } else {
            setErrorPermiso('No tienes permiso para esta acción');
            // Opcional: actualizar la lista de permisos
            const updatedPermisos = permisos.filter(p => p !== permiso);
            setPermisos(updatedPermisos);
            localStorage.setItem('permisos', JSON.stringify(updatedPermisos));
        }
    } catch (error) {
        console.error('Error:', error);
        setErrorPermiso('Error al procesar la solicitud');
    } finally {
        setLoadingPermiso(null);
    }
};

    // Cargar datos del usuario y permisos
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/users/${id}`,
                    { withCredentials: true }
                );
                
                setUser(res.data);
                const storedPermisos = JSON.parse(localStorage.getItem('permisos') || '[]');
                setPermisos(storedPermisos);
                setShowWelcome(true);
                setTimeout(() => setShowWelcome(false), 3000);
                
                /*
                // Redirección basada en rol (opcional)
                if (res.data.role_id === 1) {
                    navigate(`/PerfilAdmin/${res.data.id}`);
                } else if (res.data.role_id === 2) {
                    navigate(`/usuarios/${res.data.id}`);
                }*/



            } catch (err) {
                console.error('Error cargando perfil:', err);
                alert('No tienes permiso para ver esta página');
            }
        };
        
        loadData();
    }, [id, navigate]);

    if (!user) return <div className="loading">Cargando perfil...</div>;

    return (
        <div className="perfil-content">
            {showWelcome && (
                <Alert
                    variant="filled"
                    icon={<CheckIcon fontSize="inherit" />}
                    severity="success"
                    sx={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        zIndex: 9999,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        borderRadius: '8px',
                        width: { xs: '80%', sm: '350px' },
                        maxWidth: '400px',
                        backgroundColor: '#f869bf',
                        color: 'white',
                        '& .MuiAlert-icon': {
                            color: 'white',
                            fontSize: '28px'
                        },
                        '& .MuiAlert-message': {
                            fontSize: '16px',
                            fontWeight: '500'
                        },
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

            {errorPermiso && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorPermiso}
                </Alert>
            )}

            <section className="permisos-section">
                <div className="permisos-header">
                    <h3>Tus Permisos</h3>
                    <small>{permisos.length} permisos asignados</small>
                </div>
                
                <div className="permisos-grid">
                    {permisos.map((permiso, index) => (
                        <button
                            key={index}
                            className={`permiso-btn ${getPermisoType(permiso)}`}
                            onClick={() => handlePermisoClick(permiso)}
                            disabled={loadingPermiso === permiso}
                            title={`Haz clic para acceder a ${formatPermisoName(permiso)}`}
                        >
                            {loadingPermiso === permiso ? (
                                <CircularProgress size={20} color="inherit" />
                            ) : (
                                <>
                                    {getPermisoIcon(permiso)}
                                    {formatPermisoName(permiso)}
                                </>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            <section className="perfil-info">
                <h2>Bienvenido: <span>{user.name}</span></h2>
                <p><strong>Apellido Paterno:</strong> {user.lastnamep}</p>
                <p><strong>Apellido materno:</strong> {user.lastnamem}</p>
                <p><strong>Fecha de cumpleaños:</strong> {user.birthdate}</p>
                <p><strong>Correo:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.role}</p>
            </section>
        </div>
    );
}

export default PerfilUsuario;