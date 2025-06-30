import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
//import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PerfilUsuario from './pages/PerfilUsuario';
import BienvenidaUsuario from './pages/Bienvenida/Bienvenida'; // 👈 Importación añadida
import ActualizarUsuario from './pages/Actualizar/ActualizarUsuario';
import PerfilAdmin from './pages/role/PerfilAdmin';
//import UsuarioDashboard from './pages/role/UsuarioDashboard';
import Layout from './Layout/Layout';


function App() {
  return (
    <Routes>
      {/* Ruta sin layout */}
      <Route path="/login" element={<Login />} />

      {/* Rutas con layout compartido (Header y MenuPost) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="PerfilAdmin/:id" element={<PerfilAdmin />} />
        <Route path="usuarios/:id" element={<PerfilUsuario />} />
        <Route path="bienvenida" element={<BienvenidaUsuario />} />
        <Route path="actualizar-datos/:id" element={<ActualizarUsuario />} />
      </Route>

      {/* Ruta de error */}
      <Route path="*" element={<div>Página no encontrada</div>} />
    </Routes>
  );
}

export default App;