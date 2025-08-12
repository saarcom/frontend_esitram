import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CrearUsuario() {
    const [form, setForm] = useState({
        name: '',
        lastnamep: '',
        lastnamem: '',
        email: '',
        password: '',
        role: 'user',
        role_id: 2 // Por defecto 'user'
    });
    const [permisosDisponibles, setPermisosDisponibles] = useState([]);
    const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);
    const navigate = useNavigate();

    // Cargar todos los permisos desde el backend
    useEffect(() => {
        axios.get('http://localhost:3000/api/users/permisos', { withCredentials: true })
            .then(res => setPermisosDisponibles(res.data))
            .catch(err => console.error('Error cargando permisos:', err));
    }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Si se cambia el rol, actualiza también el role_id
        if (name === 'role') {
            setForm(prev => ({
                ...prev,
                role: value,
                role_id: value === 'admin' ? 1 : 2
            }));
        } else {
            setForm(prev => ({
                ...prev,
                [name]: value
            }));
        }


    };

    const handlePermisoChange = (permisoId) => {
        setPermisosSeleccionados(prev =>
            prev.includes(permisoId)
                ? prev.filter(id => id !== permisoId)
                : [...prev, permisoId]
        );
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const payload = {
                usuario: form,
                permisosIds:  permisosSeleccionados
            };


            console.log('Datos enviados:', payload);

            await axios.post('http://localhost:3000/api/users/crear', payload, { withCredentials: true });

            alert('Usuario creado correctamente');
            navigate('/PerfilAdmin');
        } catch (error) {
            console.error('Error al crear usuario:', error);
            alert('Error al crear usuario');
        }
    };

    return (
        <div className="crear-usuario-container">
            <h2>Crear Nuevo Usuario</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
                <input type="text" name="lastnamep" placeholder="Apellido Paterno" value={form.lastnamep} onChange={handleChange} required />
                <input type="text" name="lastnamem" placeholder="Apellido Materno" value={form.lastnamem} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />

                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>

                {/* Mostrar selección de permisos solo si no es admin */}
                {form.role === 'user' && (
                    <div className="permisos-checkboxes">
                        <h4>Selecciona permisos:</h4>
                        {permisosDisponibles.map(permiso => (
                            <label key={permiso.id}>
                                <input
                                    type="checkbox"
                                    checked={permisosSeleccionados.includes(permiso.id)}
                                    onChange={() => handlePermisoChange(permiso.id)}
                                />
                                {permiso.nombre}
                            </label>
                        ))}
                    </div>
                )}

                <button type="submit">Crear</button>
                <button type="button" onClick={() => navigate(-1)}>Cancelar</button>
            </form>
        </div>
    );
}

export default CrearUsuario;
