import { Navigate } from 'react-router-dom';
import useStore from '../store/store';

const PublicRoute = ({ element }) => {
  const { user, token } = useStore();
  
  // Si ya está autenticado, redirigir al dashboard
  if (token && user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Si no está autenticado, mostrar la página pública (login)
  return element;
};

export default PublicRoute;