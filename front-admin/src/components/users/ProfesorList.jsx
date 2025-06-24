import { useState, useEffect } from "react";

function ProfesorList() {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState({});

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api-django/auth/professors/"
        );
        const data = await response.json();
        console.log(data); // Verifica la estructura de la respuesta
        setProfessors(data);
        // Inicializar estado de contraseñas ocultas
        const passwordStates = {};
        data.forEach(professor => {
          passwordStates[professor.id] = false;
        });
        setShowPasswords(passwordStates);
      } catch (error) {
        console.error("Error fetching professors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfessors();
  }, []);

  const togglePasswordVisibility = (professorId) => {
    setShowPasswords(prev => ({
      ...prev,
      [professorId]: !prev[professorId]
    }));
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-success">
              <i className="bi bi-person-workspace me-2"></i>
              Lista de Profesores
            </h2>
            <span className="badge bg-secondary fs-6">
              Total: {professors.length} profesores
            </span>
          </div>

          {professors.length === 0 ? (
            <div className="alert alert-info text-center" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              No hay profesores registrados
            </div>
          ) : (
            <div className="row">
              {professors.map((professor) => (
                <div key={professor.id} className="col-lg-6 col-xl-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-header bg-success text-white">
                      <div className="d-flex align-items-center">
                        {professor.user_details.profile_picture_url ? (
                          <img
                            src={professor.user_details.profile_picture_url}
                            alt="Profile"
                            className="rounded-circle me-2"
                            width="40"
                            height="40"
                          />
                        ) : (
                          <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2" 
                               style={{width: "40px", height: "40px"}}>
                            <i className="bi bi-person text-muted"></i>
                          </div>
                        )}
                        <div>
                          <h6 className="card-title mb-0">
                            {professor.user_details.username}
                          </h6>
                          <small className="text-light">
                            <i className="bi bi-mortarboard me-1"></i>
                            {professor.user_details.role}
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="mb-2">
                        <strong className="text-muted">
                          <i className="bi bi-person me-1"></i>
                          Nombre:
                        </strong>
                        <span className="ms-1">
                          {professor.user_details.first_name} {professor.user_details.last_name}
                        </span>
                      </div>

                      <div className="mb-2">
                        <strong className="text-muted">
                          <i className="bi bi-envelope me-1"></i>
                          Email:
                        </strong>
                        <span className="ms-1 text-break">
                          {professor.user_details.email}
                        </span>
                      </div>

                      {professor.user_details.phone && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-telephone me-1"></i>
                            Teléfono:
                          </strong>
                          <span className="ms-1">
                            {professor.user_details.phone}
                          </span>
                        </div>
                      )}

                      {professor.employee_code && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-card-text me-1"></i>
                            Código Empleado:
                          </strong>
                          <span className="ms-1 badge bg-light text-dark">
                            {professor.employee_code}
                          </span>
                        </div>
                      )}

                      {professor.hire_date && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-calendar-check me-1"></i>
                            Fecha de Contratación:
                          </strong>
                          <span className="ms-1">
                            {new Date(professor.hire_date).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      )}

                      {professor.department && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-building me-1"></i>
                            Departamento:
                          </strong>
                          <span className="ms-1">
                            {professor.department}
                          </span>
                        </div>
                      )}

                      {professor.academic_title && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-award me-1"></i>
                            Título Académico:
                          </strong>
                          <span className="ms-1">
                            {professor.academic_title}
                          </span>
                        </div>
                      )}

                      {professor.office_location && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-geo-alt me-1"></i>
                            Oficina:
                          </strong>
                          <span className="ms-1">
                            {professor.office_location}
                          </span>
                        </div>
                      )}

                      <div className="mb-2">
                        <strong className="text-muted">
                          <i className="bi bi-calendar-plus me-1"></i>
                          Registro:
                        </strong>
                        <span className="ms-1">
                          {new Date(professor.user_details.date_joined).toLocaleDateString('es-ES')}
                        </span>
                      </div>

                      {professor.user_details.last_login && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-clock me-1"></i>
                            Último acceso:
                          </strong>
                          <span className="ms-1">
                            {new Date(professor.user_details.last_login).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      )}

                      <div className="mb-2">
                        <strong className="text-muted">
                          <i className="bi bi-key me-1"></i>
                          Contraseña:
                        </strong>
                        <div className="d-flex align-items-center mt-1">
                          <input
                            type={showPasswords[professor.id] ? "text" : "password"}
                            value={professor.user_details.password || "No disponible"}
                            readOnly
                            className="form-control form-control-sm me-2"
                            style={{ 
                              backgroundColor: '#f8f9fa',
                              maxWidth: '200px',
                              fontSize: '0.875rem'
                            }}
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => togglePasswordVisibility(professor.id)}
                            style={{ minWidth: '40px' }}
                          >
                            {showPasswords[professor.id] ? '🙈' : '👁️'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer bg-light">
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-success btn-sm">
                          <i className="bi bi-eye me-1"></i>
                          Ver Perfil
                        </button>
                        <button className="btn btn-outline-secondary btn-sm">
                          <i className="bi bi-pencil me-1"></i>
                          Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfesorList;