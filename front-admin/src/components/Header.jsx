import { NavLink, useNavigate } from "react-router-dom";
import useStore from "../store/store";
import '../css/header.css'
function Header({ minimal = false }) {
  const navigate = useNavigate();
  const { user, token, logout } = useStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Header simplificado para usuarios no autenticados
  if (!token || !user) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm header-unauthenticated">
        <div className="container-fluid">
          <NavLink className="navbar-brand header-brand" to="/login">
            <div className="header-brand-icon">
              <i className="bi bi-mortarboard-fill"></i>
            </div>
            <div className="header-brand-text">
              <span className="header-brand-title">MentorIA</span>
              <div className="header-brand-subtitle">
                Sistema de Gestión Educativa
              </div>
            </div>
          </NavLink>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top header-authenticated">
      <div className="container-fluid">
        <NavLink className="navbar-brand header-brand" to="/dashboard">
          <div className="header-brand-icon">
            <i className="bi bi-mortarboard-fill"></i>
          </div>
          <div className="header-brand-text">
            <span className="header-brand-title">MentorIA</span>
            <div className="header-brand-subtitle">
              Sistema de Gestión Educativa
            </div>
          </div>
        </NavLink>

        {!minimal && (
          <>
            <button
              className="navbar-toggler header-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                {/* Dropdown Académico */}
                <li className="nav-item dropdown header-dropdown">
                  <button
                    className="nav-link btn btn-link dropdown-toggle header-dropdown-toggle"
                    id="academicListDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-book me-2"></i>
                    <span className="header-dropdown-text">Académico</span>
                  </button>
                  <ul className="dropdown-menu header-dropdown-menu">
                    <li>
                      <h6 className="dropdown-header header-dropdown-header">
                        <i className="bi bi-list-ul me-2"></i>
                        Consultar Información
                      </h6>
                    </li>
                    <li>
                      <NavLink className="dropdown-item header-dropdown-item" to="/list-carreras">
                        <div className="header-dropdown-icon bg-primary">
                          <i className="bi bi-mortarboard"></i>
                        </div>
                        <div className="header-dropdown-content">
                          <div className="header-dropdown-title">Carreras</div>
                          <small className="header-dropdown-subtitle">Ver todas las carreras</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item header-dropdown-item" to="/list-courses">
                        <div className="header-dropdown-icon bg-success">
                          <i className="bi bi-journal-bookmark"></i>
                        </div>
                        <div className="header-dropdown-content">
                          <div className="header-dropdown-title">Cursos</div>
                          <small className="header-dropdown-subtitle">Gestionar cursos</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item header-dropdown-item" to="/list-periods">
                        <div className="header-dropdown-icon bg-warning">
                          <i className="bi bi-calendar-range"></i>
                        </div>
                        <div className="header-dropdown-content">
                          <div className="header-dropdown-title">Períodos Académicos</div>
                          <small className="header-dropdown-subtitle">Administrar períodos</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item header-dropdown-item" to="/list-enrollments">
                        <div className="header-dropdown-icon bg-info">
                          <i className="bi bi-clipboard-check"></i>
                        </div>
                        <div className="header-dropdown-content">
                          <div className="header-dropdown-title">Matrículas</div>
                          <small className="header-dropdown-subtitle">Administrar matrículas</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider header-dropdown-divider" />
                    </li>
                    <li>
                      <h6 className="dropdown-header header-dropdown-header">
                        <i className="bi bi-plus-circle me-2"></i>
                        Crear Nuevo
                      </h6>
                    </li>
                    <li>
                      <NavLink className="dropdown-item header-dropdown-item" to="/create-career">
                        <div className="header-dropdown-icon bg-secondary">
                          <i className="bi bi-plus-square"></i>
                        </div>
                        <div className="header-dropdown-content">
                          <div className="header-dropdown-title">Nueva Carrera</div>
                          <small className="header-dropdown-subtitle">Registrar carrera</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item header-dropdown-item" to="/create-course">
                        <div className="header-dropdown-icon bg-secondary">
                          <i className="bi bi-plus-square"></i>
                        </div>
                        <div className="header-dropdown-content">
                          <div className="header-dropdown-title">Nuevo Curso</div>
                          <small className="header-dropdown-subtitle">Crear curso</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item header-dropdown-item" to="/create-academic-period">
                        <div className="header-dropdown-icon bg-secondary">
                          <i className="bi bi-plus-square"></i>
                        </div>
                        <div className="header-dropdown-content">
                          <div className="header-dropdown-title">Nuevo Período</div>
                          <small className="header-dropdown-subtitle">Definir período</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item header-dropdown-item" to="/assign-professor">
                        <div className="header-dropdown-icon bg-danger">
                          <i className="bi bi-person-check"></i>
                        </div>
                        <div className="header-dropdown-content">
                          <div className="header-dropdown-title">Asignar Profesor</div>
                          <small className="header-dropdown-subtitle">Designar a curso</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item header-dropdown-item" to="/create-enrollment">
                        <div className="header-dropdown-icon bg-secondary">
                          <i className="bi bi-person-plus"></i>
                        </div>
                        <div className="header-dropdown-content">
                          <div className="header-dropdown-title">Nueva Matrícula</div>
                          <small className="header-dropdown-subtitle">Asignar estudiante</small>
                        </div>
                      </NavLink>
                    </li>
                  </ul>
                </li>

                {/* Dropdown Usuarios */}
                <li className="nav-item dropdown header-dropdown">
                  <button
                    className="nav-link btn btn-link dropdown-toggle header-dropdown-toggle"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-lines-fill me-2"></i>
                    <span className="header-dropdown-text">Usuarios</span>
                  </button>
                  <ul className="dropdown-menu header-dropdown-menu">
                    <li>
                      <h6 className="dropdown-header header-dropdown-header">
                        <i className="bi bi-list-ul me-2"></i>
                        Consultar Usuarios
                      </h6>
                    </li>
                    <li>
                      <NavLink className="dropdown-item header-dropdown-item" to="/list-alumnos">
                        <div className="header-dropdown-icon bg-success">
                          <i className="bi bi-person-badge"></i>
                        </div>
                        <div className="header-dropdown-content">
                          <div className="header-dropdown-title">Alumnos</div>
                          <small className="header-dropdown-subtitle">Gestionar estudiantes</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item header-dropdown-item" to="/list-profesores">
                        <div className="header-dropdown-icon bg-primary">
                          <i className="bi bi-person-workspace"></i>
                        </div>
                        <div className="header-dropdown-content">
                          <div className="header-dropdown-title">Profesores</div>
                          <small className="header-dropdown-subtitle">Administrar docentes</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item header-dropdown-item" to="/list-admins">
                        <div className="header-dropdown-icon bg-warning">
                          <i className="bi bi-person-gear"></i>
                        </div>
                        <div className="header-dropdown-content">
                          <div className="header-dropdown-title">Administradores</div>
                          <small className="header-dropdown-subtitle">Ver administradores</small>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider header-dropdown-divider" />
                    </li>
                    <li>
                      <h6 className="dropdown-header header-dropdown-header">
                        <i className="bi bi-plus-circle me-2"></i>
                        Crear Usuario
                      </h6>
                    </li>
                    <li>
                      <NavLink className="dropdown-item header-dropdown-item" to="/create-user">
                        <div className="header-dropdown-icon bg-danger">
                          <i className="bi bi-person-plus-fill"></i>
                        </div>
                        <div className="header-dropdown-content">
                          <div className="header-dropdown-title">Nuevo Usuario</div>
                          <small className="header-dropdown-subtitle">Registrar usuario</small>
                        </div>
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Información del usuario y cerrar sesión */}
              <ul className="navbar-nav header-user-section">
                <li className="nav-item header-user-info">
                  <div className="header-user-card">
                    <div className="header-user-avatar">
                      <i className="bi bi-person-circle"></i>
                    </div>
                    <div className="header-user-details">
                      <div className="header-user-name">{user.username}</div>
                      <div className="header-user-status">En línea</div>
                    </div>
                  </div>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn header-logout-btn"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    <span className="header-logout-text">Cerrar Sesión</span>
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