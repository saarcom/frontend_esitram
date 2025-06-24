/*import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
function PrivateRoute({ children, role}) {
   
/*
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute; */


// src/components/PrivateRoute.jsx


//import { Navigate } from 'react-router-dom';

import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const PrivateRoute = ({ children, role }) => {
  const user = useUser();
  const location = useLocation();
  const params = useParams(); // para leer el :id si está en la URL

  if (user === null) return <div>Cargando...</div>;

  if (!user) return <Navigate to="/login" />;

  // Si hay rol requerido y no lo cumple
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  // Validación de acceso a su propia página: "/usuarios/:id"
  if (location.pathname.startsWith('/usuarios/')) {
    const idRuta = params.id || location.pathname.split('/').pop();
    if (user.id.toString() !== idRuta.toString()) {
      alert('No tienes permiso para ver esta página');
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};

export default PrivateRoute;

