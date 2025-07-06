import { Navigate } from 'react-router-dom';
import useStore from '../store/store';

const PrivateRoute = ({ element, roleRequired }) => {
  // ✅ Obtener datos del store (que ya está sincronizado con localStorage)
  const { user, token } = useStore();
  
  // ✅ Verificar si hay token y usuario
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // ✅ Verificar si el rol es el requerido
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/login" replace />;
  }
  
  return element;
};

export default PrivateRoute;