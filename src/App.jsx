import { Routes, Route  } from 'react-router-dom';
import Login from './pages/Login';
//import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PerfilUsuario from './pages/PerfilUsuario';
import BienvenidaUsuario from './pages/Bienvenida/Bienvenida'; // 👈 Importación añadida
import ActualizarUsuario from './pages/Actualizar/ActualizarUsuario';
import PerfilAdmin from './pages/role/PerfilAdmin';
//import UsuarioDashboard from './pages/role/UsuarioDashboard';

function App() {
 //const user = JSON.parse(localStorage.getItem('user'));

  return (
    
    <Routes>

      <Route path="/login" element={<Login />} />

      <Route
         path="/PerfilAdmin/:id"
        element={
          <PrivateRoute>
            <PerfilAdmin />
          </PrivateRoute>
        }
      />

      
      <Route
        path="/usuarios/:id"
        element={
          <PrivateRoute>
            <PerfilUsuario />
          </PrivateRoute>
        }
      />

      <Route
        path="/bienvenida"
        element={
          <PrivateRoute>
            <BienvenidaUsuario />
          </PrivateRoute>
        }
      />
      <Route 
        path="/actualizar-datos/:id" 
        element={
       <ActualizarUsuario />
       } 
      />

      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
}

export default App;
