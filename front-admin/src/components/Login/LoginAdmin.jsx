import { useState } from 'react';

const LoginAdmin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/api-django/auth/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      // Si el login es exitoso, pasamos los datos a la función onLoginSuccess
      onLoginSuccess(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
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
              
              <div onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label fw-semibold">
                    <i className="fas fa-user me-2 text-danger"></i>
                    Usuario
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingresa tu usuario"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-semibold">
                    <i className="fas fa-lock me-2 text-danger"></i>
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                    disabled={isLoading}
                  />
                </div>
                
                <div className="d-grid">
                  <button 
                    onClick={handleSubmit}
                    className="btn btn-danger btn-lg fw-semibold"
                    disabled={isLoading || !username || !password}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Iniciando sesión...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Iniciar Sesión
                      </>
                    )}
                  </button>
                </div>
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