import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/store';
import { GoogleLogin } from '@react-oauth/google';
import { login } from '../../services/authService';

const LoginAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const setUser = useStore((state) => state.setUser);

  const handleGoogleLoginSuccess = async (response) => {
    const { credential } = response; // Esto es el token de Google
    setIsLoading(true);
    setError('');
    
    try {
      const data = await login(credential); // Enviar el token de Google al servicio de login

      // ✅ Accedemos correctamente a la estructura
      const userRole = data.user.role;

      // Verifica si el rol es 'admin' antes de redirigir
      if (userRole === 'admin') {
        setUser(data.user, data.token); // Actualiza Zustand
        
        // Guardar token y datos de usuario en localStorage
        localStorage.setItem('access_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        navigate('/dashboard');
      } else {
        setError('Acceso denegado. Solo los administradores pueden acceder.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Error en Google Login:', error);
    setError('Error al autenticar con Google.');
  };

  return (
    <div className="w-100">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-danger text-white text-center py-3">
          <h4 className="mb-0 fw-bold">
            <i className="fas fa-user-shield me-2"></i>
            Iniciar Sesión
          </h4>
        </div>
        <div className="card-body p-4">
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          <div className="d-grid mb-4">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess} // Manejar éxito
              onError={handleGoogleLoginFailure} // Manejar error
            />
          </div>
        </div>

        <div className="card-footer text-center py-3 bg-light">
          <small className="text-muted">
            <i className="fas fa-shield-alt me-1"></i>
            Acceso Seguro al Sistema
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
