import { NavLink, useNavigate } from "react-router-dom";
import useStore from "../store/store";

function Header({ minimal = false }) {
  const navigate = useNavigate();
  const { user, token, logout } = useStore();

  const handleLogout = () => {
    logout(); // Esto limpia tanto Zustand como localStorage
    navigate('/login'); // Redirigir al login
  };

  // Si no hay usuario autenticado, mostrar header simplificado
  if (!token || !user) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ 
        background: "linear-gradient(135deg, #002244 0%, #004488 100%)",
        borderBottom: "3px solid #0066cc"
      }}>
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold d-flex align-items-center py-2" to="/login">
            <div className="bg-white rounded-circle p-2 me-3 shadow-sm">
              <i className="bi bi-mortarboard-fill text-primary fs-4"></i>
            </div>
            <div>
              <span style={{ fontSize: "1.8rem", letterSpacing: "1px" }}>MentorIA</span>
              <div className="text-light opacity-75" style={{ fontSize: "0.8rem", marginTop: "-5px" }}>
                Sistema de Gestión Educativa
              </div>
            </div>
          </NavLink>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top" style={{ 
      background: "linear-gradient(135deg, #002244 0%, #004488 100%)",
      borderBottom: "3px solid #0066cc"
    }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold d-flex align-items-center py-2" to="/dashboard">
          <div className="bg-white rounded-circle p-2 me-3 shadow-sm">
            <i className="bi bi-mortarboard-fill text-primary fs-4"></i>
          </div>
          <div>
            <span style={{ fontSize: "1.8rem", letterSpacing: "1px" }}>MentorIA</span>
            <div className="text-light opacity-75" style={{ fontSize: "0.8rem", marginTop: "-5px" }}>
              Sistema de Gestión Educativa
            </div>
          </div>
        </NavLink>

        {!minimal && (
          <>
            <button
              className="navbar-toggler border-0 shadow-sm"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ 
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)"
              }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                
                {/* Académico */}
                <li className="nav-item dropdown mx-1">
                  <button
                    className="nav-link btn btn-link text-white dropdown-toggle border-0 rounded-pill px-3 py-2 position-relative"
                    id="academicListDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ 
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.2)";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.1)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <i className="bi bi-book me-2"></i>
                    Académico
                  </button>
                  <ul className="dropdown-menu shadow-lg border-0 rounded-3 mt-2" style={{ 
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    minWidth: "280px"
                  }}>
                    <li>
                      <h6 className="dropdown-header text-primary fw-bold border-bottom pb-2">
                        <i className="bi bi-list-ul me-2"></i> 
                        Consultar Información
                      </h6>
                    </li>
                    <li>
                      <NavLink className="dropdown-item rounded-2 mx-2 my-1 py-2 d-flex align-items-center" to="/list-carreras"
                        style={{ transition: "all 0.2s ease" }}
                        onMouseEnter={(e) => e.target.style.background = "#e3f2fd"}
                        onMouseLeave={(e) => e.target.style.background = "transparent"}
                      >
                        <div className="bg-primary rounded-circle p-2 me-3">
                          <i className="bi bi-mortarboard text-white"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Carreras</div>
                          <small className="text-muted">Ver todas las carreras</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item rounded-2 mx-2 my-1 py-2 d-flex align-items-center" to="/list-courses"
                        style={{ transition: "all 0.2s ease" }}
                        onMouseEnter={(e) => e.target.style.background = "#e8f5e8"}
                        onMouseLeave={(e) => e.target.style.background = "transparent"}
                      >
                        <div className="bg-success rounded-circle p-2 me-3">
                          <i className="bi bi-journal-bookmark text-white"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Cursos</div>
                          <small className="text-muted">Gestionar cursos</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item rounded-2 mx-2 my-1 py-2 d-flex align-items-center" to="/list-periods"
                        style={{ transition: "all 0.2s ease" }}
                        onMouseEnter={(e) => e.target.style.background = "#fff3e0"}
                        onMouseLeave={(e) => e.target.style.background = "transparent"}
                      >
                        <div className="bg-warning rounded-circle p-2 me-3">
                          <i className="bi bi-calendar-range text-white"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Períodos Académicos</div>
                          <small className="text-muted">Administrar períodos</small>
                        </div>
                      </NavLink>
                    </li>
                    <li><hr className="dropdown-divider mx-2" /></li>
                    <li>
                      <h6 className="dropdown-header text-success fw-bold border-bottom pb-2">
                        <i className="bi bi-plus-circle me-2"></i> 
                        Crear Nuevo
                      </h6>
                    </li>
                    <li>
                      <NavLink className="dropdown-item rounded-2 mx-2 my-1 py-2 d-flex align-items-center" to="/create-career"
                        style={{ transition: "all 0.2s ease" }}
                        onMouseEnter={(e) => e.target.style.background = "#f3e5f5"}
                        onMouseLeave={(e) => e.target.style.background = "transparent"}
                      >
                        <div className="bg-info rounded-circle p-2 me-3">
                          <i className="bi bi-plus-square text-white"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Nueva Carrera</div>
                          <small className="text-muted">Registrar carrera</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item rounded-2 mx-2 my-1 py-2 d-flex align-items-center" to="/create-course"
                        style={{ transition: "all 0.2s ease" }}
                        onMouseEnter={(e) => e.target.style.background = "#f3e5f5"}
                        onMouseLeave={(e) => e.target.style.background = "transparent"}
                      >
                        <div className="bg-info rounded-circle p-2 me-3">
                          <i className="bi bi-plus-square text-white"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Nuevo Curso</div>
                          <small className="text-muted">Crear curso</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item rounded-2 mx-2 my-1 py-2 d-flex align-items-center" to="/create-period"
                        style={{ transition: "all 0.2s ease" }}
                        onMouseEnter={(e) => e.target.style.background = "#f3e5f5"}
                        onMouseLeave={(e) => e.target.style.background = "transparent"}
                      >
                        <div className="bg-info rounded-circle p-2 me-3">
                          <i className="bi bi-plus-square text-white"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Nuevo Período</div>
                          <small className="text-muted">Definir período</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item rounded-2 mx-2 my-1 py-2 d-flex align-items-center" to="/assign-professor"
                        style={{ transition: "all 0.2s ease" }}
                        onMouseEnter={(e) => e.target.style.background = "#ffebee"}
                        onMouseLeave={(e) => e.target.style.background = "transparent"}
                      >
                        <div className="bg-danger rounded-circle p-2 me-3">
                          <i className="bi bi-person-check text-white"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Asignar Profesor</div>
                          <small className="text-muted">Designar a curso</small>
                        </div>
                      </NavLink>
                    </li>
                  </ul>
                </li>

                {/* Usuarios */}
                <li className="nav-item dropdown mx-1">
                  <button
                    className="nav-link btn btn-link text-white dropdown-toggle border-0 rounded-pill px-3 py-2"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ 
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.2)";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.1)";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <i className="bi bi-person-lines-fill me-2"></i>
                    Usuarios
                  </button>
                  <ul className="dropdown-menu shadow-lg border-0 rounded-3 mt-2" style={{ 
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    minWidth: "280px"
                  }}>
                    <li>
                      <h6 className="dropdown-header text-primary fw-bold border-bottom pb-2">
                        <i className="bi bi-list-ul me-2"></i> 
                        Consultar Usuarios
                      </h6>
                    </li>
                    <li>
                      <NavLink className="dropdown-item rounded-2 mx-2 my-1 py-2 d-flex align-items-center" to="/list-alumnos"
                        style={{ transition: "all 0.2s ease" }}
                        onMouseEnter={(e) => e.target.style.background = "#e8f5e8"}
                        onMouseLeave={(e) => e.target.style.background = "transparent"}
                      >
                        <div className="bg-success rounded-circle p-2 me-3">
                          <i className="bi bi-person-badge text-white"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Alumnos</div>
                          <small className="text-muted">Gestionar estudiantes</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item rounded-2 mx-2 my-1 py-2 d-flex align-items-center" to="/list-profesores"
                        style={{ transition: "all 0.2s ease" }}
                        onMouseEnter={(e) => e.target.style.background = "#e3f2fd"}
                        onMouseLeave={(e) => e.target.style.background = "transparent"}
                      >
                        <div className="bg-primary rounded-circle p-2 me-3">
                          <i className="bi bi-person-workspace text-white"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Profesores</div>
                          <small className="text-muted">Administrar docentes</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item rounded-2 mx-2 my-1 py-2 d-flex align-items-center" to="/list-admins"
                        style={{ transition: "all 0.2s ease" }}
                        onMouseEnter={(e) => e.target.style.background = "#fff3e0"}
                        onMouseLeave={(e) => e.target.style.background = "transparent"}
                      >
                        <div className="bg-warning rounded-circle p-2 me-3">
                          <i className="bi bi-person-gear text-white"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Administradores</div>
                          <small className="text-muted">Ver administradores</small>
                        </div>
                      </NavLink>
                    </li>
                    <li><hr className="dropdown-divider mx-2" /></li>
                    <li>
                      <h6 className="dropdown-header text-success fw-bold border-bottom pb-2">
                        <i className="bi bi-plus-circle me-2"></i> 
                        Crear Usuario
                      </h6>
                    </li>
                    <li>
                      <NavLink className="dropdown-item rounded-2 mx-2 my-1 py-2 d-flex align-items-center" to="/create-user"
                        style={{ transition: "all 0.2s ease" }}
                        onMouseEnter={(e) => e.target.style.background = "#ffebee"}
                        onMouseLeave={(e) => e.target.style.background = "transparent"}
                      >
                        <div className="bg-danger rounded-circle p-2 me-3">
                          <i className="bi bi-person-plus-fill text-white"></i>
                        </div>
                        <div>
                          <div className="fw-semibold">Nuevo Usuario</div>
                          <small className="text-muted">Registrar usuario</small>
                        </div>
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Información del usuario y cerrar sesión */}
              <ul className="navbar-nav">
                <li className="nav-item me-3 d-flex align-items-center">
                  <div className="d-flex align-items-center bg-white bg-opacity-10 rounded-pill px-3 py-2 backdrop-blur">
                    <div className="bg-white rounded-circle p-2 me-2">
                      <i className="bi bi-person-circle text-primary"></i>
                    </div>
                    <div className="text-white">
                      <div className="fw-semibold" style={{ fontSize: "0.9rem" }}>
                        {user.username}
                      </div>
                      <div className="opacity-75" style={{ fontSize: "0.75rem", marginTop: "-2px" }}>
                        En línea
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-outline-light border-2 rounded-pill px-4 py-2 fw-semibold"
                    onClick={handleLogout}
                    style={{ 
                      transition: "all 0.3s ease",
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(220,53,69,0.2)";
                      e.target.style.borderColor = "#dc3545";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.1)";
                      e.target.style.borderColor = "#fff";
                      e.target.style.transform = "translateY(0)";
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;