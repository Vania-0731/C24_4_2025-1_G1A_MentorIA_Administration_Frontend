import { NavLink } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="container-fluid py-4">
          
          {/* Header de Bienvenida */}
          <div className="row mb-4">
            <div className="col">
              <div className="bg-primary text-white rounded-3 p-4 shadow-sm">
                <h1 className="h3 mb-2">
                  <i className="bi bi-speedometer2 me-2"></i>
                  Bienvenido al Dashboard de MentorIA
                </h1>
                <p className="mb-0 opacity-75">
                  Gestiona tu sistema educativo de manera eficiente desde aquí
                </p>
              </div>
            </div>
          </div>

          {/* Secciones de Acceso Rápido */}
          <div className="row">
            
            {/* Gestión Académica */}
            <div className="col-lg-6 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-book me-2"></i>
                    Gestión Académica
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-6">
                      <NavLink to="/list-carreras" className="btn btn-outline-primary w-100 h-100 d-flex flex-column justify-content-center align-items-center text-decoration-none">
                        <i className="bi bi-mortarboard fs-4 mb-2"></i>
                        <span>Ver Carreras</span>
                      </NavLink>
                    </div>
                    <div className="col-6">
                      <NavLink to="/list-courses" className="btn btn-outline-primary w-100 h-100 d-flex flex-column justify-content-center align-items-center text-decoration-none">
                        <i className="bi bi-journal-bookmark fs-4 mb-2"></i>
                        <span>Ver Cursos</span>
                      </NavLink>
                    </div>
                    <div className="col-6">
                      <NavLink to="/list-periods" className="btn btn-outline-primary w-100 h-100 d-flex flex-column justify-content-center align-items-center text-decoration-none">
                        <i className="bi bi-calendar-range fs-4 mb-2"></i>
                        <span>Períodos</span>
                      </NavLink>
                    </div>
                    <div className="col-6">
                      <NavLink to="/assign-professor" className="btn btn-outline-primary w-100 h-100 d-flex flex-column justify-content-center align-items-center text-decoration-none">
                        <i className="bi bi-person-check fs-4 mb-2"></i>
                        <span>Asignar Prof.</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gestión de Usuarios */}
            <div className="col-lg-6 mb-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-success text-white">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-person-lines-fill me-2"></i>
                    Gestión de Usuarios
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-6">
                      <NavLink to="/list-alumnos" className="btn btn-outline-success w-100 h-100 d-flex flex-column justify-content-center align-items-center text-decoration-none">
                        <i className="bi bi-person-badge fs-4 mb-2"></i>
                        <span>Ver Alumnos</span>
                      </NavLink>
                    </div>
                    <div className="col-6">
                      <NavLink to="/list-profesores" className="btn btn-outline-success w-100 h-100 d-flex flex-column justify-content-center align-items-center text-decoration-none">
                        <i className="bi bi-person-workspace fs-4 mb-2"></i>
                        <span>Ver Profesores</span>
                      </NavLink>
                    </div>
                    <div className="col-6">
                      <NavLink to="/list-admins" className="btn btn-outline-success w-100 h-100 d-flex flex-column justify-content-center align-items-center text-decoration-none">
                        <i className="bi bi-person-gear fs-4 mb-2"></i>
                        <span>Ver Admins</span>
                      </NavLink>
                    </div>
                    <div className="col-6">
                      <NavLink to="/create-user" className="btn btn-outline-success w-100 h-100 d-flex flex-column justify-content-center align-items-center text-decoration-none">
                        <i className="bi bi-person-plus-fill fs-4 mb-2"></i>
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
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-warning text-dark">
                  <h5 className="card-title mb-0">
                    <i className="bi bi-lightning-charge me-2"></i>
                    Acciones Rápidas
                  </h5>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <NavLink to="/create-career" className="btn btn-warning w-100 d-flex align-items-center justify-content-center text-decoration-none">
                        <i className="bi bi-plus-square me-2"></i>
                        Nueva Carrera
                      </NavLink>
                    </div>
                    <div className="col-md-4">
                      <NavLink to="/create-course" className="btn btn-warning w-100 d-flex align-items-center justify-content-center text-decoration-none">
                        <i className="bi bi-plus-square me-2"></i>
                        Nuevo Curso
                      </NavLink>
                    </div>
                    <div className="col-md-4">
                      <NavLink to="/create-period" className="btn btn-warning w-100 d-flex align-items-center justify-content-center text-decoration-none">
                        <i className="bi bi-plus-square me-2"></i>
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