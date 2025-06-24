import { useParams } from 'react-router-dom';

export default function UsuarioDashboard() {
  const { id } = useParams();
  return <h1>Panel de usuario con ID: {id}</h1>;
}