import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginAdmin from '../components/Login/LoginAdmin';

function Home() {
  const [userData, setUserData] = useState({
    token: '',
    user_id: '',
    username: '',
    role: ''
  });
  const navigate = useNavigate();

  // Manejo de login exitoso
  const handleLoginSuccess = (data) => {
    setUserData({
      token: data.token,
      user_id: data.user_id,
      username: data.username,
      role: data.role
    });
    
    console.log('Login successful', data);
    
    // Guardar token en localStorage
    localStorage.setItem('access_token', data.token);
    localStorage.setItem('user_role', data.role);
    localStorage.setItem('username', data.username);
    
    // Siempre redirigir al dashboard
    navigate('/dashboard');
  };

  return (
    <div className="home-page d-flex flex-column min-vh-100">
      <Header minimal={true} />
      
      <main className="flex-grow-1">
        {/* Hero Section */}
        <section className="bg-danger text-white py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="display-4 fw-bold mb-4">
                  <i className="bi bi-mortarboard-fill me-3"></i>
                  MentorIA
                </h1>
                <p className="lead mb-4">
                  Sistema de gestión educativa integral para administradores, 
                  profesores y estudiantes.
                </p>
              </div>
              <div className="col-lg-6 text-center">
                <i className="bi bi-laptop display-1 opacity-75"></i>
              </div>
            </div>
          </div>
        </section>

        {/* Login Section */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="text-center mb-5">
                  <h2 className="text-danger mb-3">
                    <i className="bi bi-shield-lock me-2"></i>
                    Acceso Administrativo
                  </h2>
                  <p className="text-muted">
                    Ingresa tus credenciales para acceder al panel de administración
                  </p>
                </div>
                
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <LoginAdmin onLoginSuccess={handleLoginSuccess} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Info Section - Solo si está logueado */}
        {userData.username && (
          <section className="py-4 bg-success text-white">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="card bg-transparent border-light">
                    <div className="card-body text-center">
                      <h5 className="card-title">
                        <i className="bi bi-check-circle me-2"></i>
                        Login Exitoso
                      </h5>
                      <div className="row text-start">
                        <div className="col-6">
                          <p className="mb-1">
                            <strong>Usuario:</strong> {userData.username}
                          </p>
                          <p className="mb-1">
                            <strong>Rol:</strong> 
                            <span className="badge bg-light text-dark ms-2">
                              {userData.role}
                            </span>
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="mb-1">
                            <strong>ID:</strong> {userData.user_id}
                          </p>
                          <p className="mb-1">
                            <strong>Estado:</strong> 
                            <span className="badge bg-light text-success ms-2">
                              Conectado
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <small className="opacity-75">
                          Redirigiendo al dashboard...
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        <section className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center">
                    <div className="text-danger mb-3">
                      <i className="bi bi-people-fill display-4"></i>
                    </div>
                    <h5 className="card-title">Gestión de Usuarios</h5>
                    <p className="card-text text-muted">
                      Administra estudiantes, profesores y otros administradores 
                      desde un panel centralizado.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center">
                    <div className="text-danger mb-3">
                      <i className="bi bi-bar-chart-fill display-4"></i>
                    </div>
                    <h5 className="card-title">Reportes y Analytics</h5>
                    <p className="card-text text-muted">
                      Visualiza estadísticas y genera reportes detallados 
                      sobre el rendimiento del sistema.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body text-center">
                    <div className="text-danger mb-3">
                      <i className="bi bi-shield-check-fill display-4"></i>
                    </div>
                    <h5 className="card-title">Seguridad Avanzada</h5>
                    <p className="card-text text-muted">
                      Sistema de autenticación robusto con roles y permisos 
                      para proteger la información.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default Home;