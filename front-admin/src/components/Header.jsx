import { NavLink } from "react-router-dom";

function Header({
  // Funciones para Listas
  onShowAlumnoList,
  onShowProfesorList,
  onShowAdminList,
  onShowCarreras,
  onShowCursos,
  onShowPeriodosAcademicos,
  
  // Funciones para Formularios
  onShowUserForm,
  onShowCarreraForm,
  onShowCursoForm,
  onShowPeriodoForm,
  onShowAssignProfessorForm,  // Nueva función agregada para el formulario de designación

  minimal = false,
}) {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#003366" }}>
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/dashboard">
          <i className="bi bi-mortarboard-fill me-2"></i>
          MentorIA
        </NavLink>

        {!minimal && (
          <>
            <button
              className="navbar-toggler"
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
              <ul className="navbar-nav me-auto" style={{ backgroundColor: "#007bff", color: "white" }}>
                
                {/* Sección Académico - Listar */}
                <li className="nav-item dropdown">
                  <button
                    className="nav-link btn btn-link text-white dropdown-toggle"
                    id="academicListDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-book me-1"></i>
                    Académico
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="academicListDropdown">
                    <li><h6 className="dropdown-header">
                      <i className="bi bi-list-ul me-1"></i>
                      Listar
                    </h6></li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => onShowCarreras('carrera')}
                      >
                        <i className="bi bi-mortarboard me-2"></i>
                        Carreras
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={onShowCursos}
                      >
                        <i className="bi bi-journal-bookmark me-2"></i>
                        Cursos
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={onShowPeriodosAcademicos}
                      >
                        <i className="bi bi-calendar-range me-2"></i>
                        Períodos Académicos
                      </button>
                    </li>
                    
                    <li><hr className="dropdown-divider" /></li>
                    
                    <li><h6 className="dropdown-header">
                      <i className="bi bi-plus-circle me-1"></i>
                      Formularios
                    </h6></li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={onShowCarreraForm}
                      >
                        <i className="bi bi-plus-square me-2"></i>
                        Nueva Carrera
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={onShowCursoForm}
                      >
                        <i className="bi bi-plus-square me-2"></i>
                        Nuevo Curso
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={onShowPeriodoForm}
                      >
                        <i className="bi bi-plus-square me-2"></i>
                        Nuevo Período
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={onShowAssignProfessorForm}  // Nueva opción para asignar profesor
                      >
                        <i className="bi bi-person-check me-2"></i>
                        Designar Profesor a Curso
                      </button>
                    </li>
                  </ul>
                </li>

                {/* Sección Usuarios */}
                <li className="nav-item dropdown"
                >
                  <button
                    className="nav-link btn btn-link text-white dropdown-toggle"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    
                  >
                    <i className="bi bi-person-lines-fill me-1"></i>
                    Usuarios
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="userDropdown">
                    <li><h6 className="dropdown-header">
                      <i className="bi bi-list-ul me-1"></i>
                      Listar
                    </h6></li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={onShowAlumnoList}
                      >
                        <i className="bi bi-person-badge me-2"></i>
                        Alumnos
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={onShowProfesorList}
                      >
                        <i className="bi bi-person-workspace me-2"></i>
                        Profesores
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={onShowAdminList}
                      >
                        <i className="bi bi-person-gear me-2"></i>
                        Administradores
                      </button>
                    </li>
                    
                    <li><hr className="dropdown-divider" /></li>
                    
                    <li><h6 className="dropdown-header">
                      <i className="bi bi-plus-circle me-1"></i>
                      Formularios
                    </h6></li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={onShowUserForm}
                      >
                        <i className="bi bi-person-plus-fill me-2"></i>
                        Nuevo Usuario
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>

              <ul className="navbar-nav">
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
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

