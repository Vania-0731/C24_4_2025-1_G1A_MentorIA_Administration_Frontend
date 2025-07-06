import { NavLink } from "react-router-dom";
import '../css/dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="container-fluid py-4">
          
          {/* Header de Bienvenida */}
          <div className="welcome-header">
            <h1>
              <i className="bi bi-speedometer2 me-2"></i>
              Bienvenido al Dashboard de MentorIA
            </h1>
            <p>
              Gestiona tu sistema educativo de manera eficiente desde aquí
            </p>
          </div>

          {/* Secciones de Acceso Rápido */}
          <div className="row">
            
            {/* Gestión Académica */}
            <div className="col-lg-6 mb-4">
              <div className="dashboard-card">
                <div className="card-header-academic">
                  <h5>
                    <i className="bi bi-book me-2"></i>
                    Gestión Académica
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-6">
                      <NavLink to="/list-carreras" className="dashboard-btn academic">
                        <i className="bi bi-mortarboard"></i>
                        <span>Ver Carreras</span>
                      </NavLink>
                    </div>
                    <div className="col-6">
                      <NavLink to="/list-courses" className="dashboard-btn academic">
                        <i className="bi bi-journal-bookmark"></i>
                        <span>Ver Cursos</span>
                      </NavLink>
                    </div>
                    <div className="col-6">
                      <NavLink to="/list-periods" className="dashboard-btn academic">
                        <i className="bi bi-calendar-range"></i>
                        <span>Períodos</span>
                      </NavLink>
                    </div>
                    <div className="col-6">
                      <NavLink to="/assign-professor" className="dashboard-btn academic">
                        <i className="bi bi-person-check"></i>
                        <span>Asignar Prof.</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gestión de Usuarios */}
            <div className="col-lg-6 mb-4">
              <div className="dashboard-card">
                <div className="card-header-users">
                  <h5>
                    <i className="bi bi-person-lines-fill me-2"></i>
                    Gestión de Usuarios
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-6">
                      <NavLink to="/list-alumnos" className="dashboard-btn users">
                        <i className="bi bi-person-badge"></i>
                        <span>Ver Alumnos</span>
                      </NavLink>
                    </div>
                    <div className="col-6">
                      <NavLink to="/list-profesores" className="dashboard-btn users">
                        <i className="bi bi-person-workspace"></i>
                        <span>Ver Profesores</span>
                      </NavLink>
                    </div>
                    <div className="col-6">
                      <NavLink to="/list-admins" className="dashboard-btn users">
                        <i className="bi bi-person-gear"></i>
                        <span>Ver Admins</span>
                      </NavLink>
                    </div>
                    <div className="col-6">
                      <NavLink to="/create-user" className="dashboard-btn users">
                        <i className="bi bi-person-plus-fill"></i>
                        <span>Nuevo Usuario</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="row">
            <div className="col-12">
              <div className="dashboard-card">
                <div className="card-header-actions">
                  <h5>
                    <i className="bi bi-lightning-charge me-2"></i>
                    Acciones Rápidas
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <NavLink to="/create-career" className="quick-action-btn">
                        <i className="bi bi-plus-square"></i>
                        Nueva Carrera
                      </NavLink>
                    </div>
                    <div className="col-md-4">
                      <NavLink to="/create-course" className="quick-action-btn">
                        <i className="bi bi-plus-square"></i>
                        Nuevo Curso
                      </NavLink>
                    </div>
                    <div className="col-md-4">
                      <NavLink to="/create-period" className="quick-action-btn">
                        <i className="bi bi-plus-square"></i>
                        Nuevo Período
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;