import { useState, useEffect } from "react";

function AlumnoList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api-django/auth/students/"
        );
        const data = await response.json();
        console.log("Estudiantes data:", data);
        console.log("Primer estudiante completo:", data[0]);
        console.log("user_details del primer estudiante:", data[0]?.user_details);
        setStudents(data);
        // Inicializar estado de contraseñas ocultas
        const passwordStates = {};
        data.forEach(student => {
          passwordStates[student.id] = false;
        });
        setShowPasswords(passwordStates);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const togglePasswordVisibility = (studentId) => {
    setShowPasswords(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
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
            <h2 className="text-primary">
              <i className="bi bi-people-fill me-2"></i>
              Lista de Alumnos
            </h2>
            <span className="badge bg-secondary fs-6">
              Total: {students.length} estudiantes
            </span>
          </div>

          {students.length === 0 ? (
            <div className="alert alert-info text-center" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              No hay estudiantes registrados
            </div>
          ) : (
            <div className="row">
              {students.map((student) => (
                <div key={student.id} className="col-lg-6 col-xl-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-header bg-primary text-white">
                      <div className="d-flex align-items-center">
                        {student.user_details.profile_picture_url ? (
                          <img
                            src={student.user_details.profile_picture_url}
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
                            {student.user_details.username}
                          </h6>
                          <small className="text-light">
                            <i className="bi bi-person-badge me-1"></i>
                            {student.user_details.role}
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
                          {student.user_details.first_name} {student.user_details.last_name}
                        </span>
                      </div>

                      <div className="mb-2">
                        <strong className="text-muted">
                          <i className="bi bi-envelope me-1"></i>
                          Email:
                        </strong>
                        <span className="ms-1 text-break">
                          {student.user_details.email}
                        </span>
                      </div>

                      {student.user_details.phone && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-telephone me-1"></i>
                            Teléfono:
                          </strong>
                          <span className="ms-1">
                            {student.user_details.phone}
                          </span>
                        </div>
                      )}

                      {student.career && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-mortarboard me-1"></i>
                            Carrera:
                          </strong>
                          <span className="ms-1">
                            {student.career_name || student.career}
                          </span>
                        </div>
                      )}

                      {student.student_code && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-card-text me-1"></i>
                            Código Estudiante:
                          </strong>
                          <span className="ms-1 badge bg-light text-dark">
                            {student.student_code}
                          </span>
                        </div>
                      )}

                      {student.enrollment_date && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-calendar-check me-1"></i>
                            Fecha de Matrícula:
                          </strong>
                          <span className="ms-1">
                            {new Date(student.enrollment_date).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      )}

                      {student.current_semester && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-collection me-1"></i>
                            Semestre Actual:
                          </strong>
                          <span className="ms-1">
                            {student.current_semester}°
                          </span>
                        </div>
                      )}

                      {student.average_grade && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-bar-chart me-1"></i>
                            Promedio:
                          </strong>
                          <span className={`ms-1 badge ${student.average_grade >= 14 ? 'bg-success' : student.average_grade >= 11 ? 'bg-warning' : 'bg-danger'}`}>
                            {student.average_grade}
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
                            type={showPasswords[student.id] ? "text" : "password"}
                            value={student.user_details.password || "No disponible"}
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
                            onClick={() => togglePasswordVisibility(student.id)}
                            style={{ minWidth: '40px' }}
                          >
                            {showPasswords[student.id] ? '🙈' : '👁️'}
                          </button>
                        </div>
                      </div>

                      <div className="mb-2">
                        <strong className="text-muted">
                          <i className="bi bi-calendar-plus me-1"></i>
                          Registro:
                        </strong>
                        <span className="ms-1">
                          {new Date(student.user_details.date_joined).toLocaleDateString('es-ES')}
                        </span>
                      </div>

                      {student.user_details.last_login && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-clock me-1"></i>
                            Último acceso:
                          </strong>
                          <span className="ms-1">
                            {new Date(student.user_details.last_login).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="card-footer bg-light">
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-primary btn-sm">
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

export default AlumnoList;