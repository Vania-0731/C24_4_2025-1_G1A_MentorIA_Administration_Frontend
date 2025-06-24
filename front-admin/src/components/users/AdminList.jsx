import { useState, useEffect } from "react";

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswords, setShowPasswords] = useState({});

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api-django/auth/users/"
        );
        const data = await response.json();

        // Filtrar solo los usuarios con role "admin"
        const adminUsers = data.filter((user) => user.role === "admin");

        console.log("Todos los usuarios:", data);
        console.log("Usuarios admin filtrados:", adminUsers);

        setAdmins(adminUsers);

        // Inicializar estado de contraseñas ocultas
        const passwordStates = {};
        adminUsers.forEach((admin) => {
          passwordStates[admin.id] = false;
        });
        setShowPasswords(passwordStates);
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  const togglePasswordVisibility = (adminId) => {
    setShowPasswords((prev) => ({
      ...prev,
      [adminId]: !prev[adminId],
    }));
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-danger" role="status">
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
            <h2 className="text-danger">
              <i className="bi bi-shield-lock me-2"></i>
              Lista de Administradores
            </h2>
            <span className="badge bg-secondary fs-6">
              Total: {admins.length} administradores
            </span>
          </div>

          {admins.length === 0 ? (
            <div className="alert alert-info text-center" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              No hay administradores registrados
            </div>
          ) : (
            <div className="row">
              {admins.map((admin) => (
                <div key={admin.id} className="col-lg-6 col-xl-4 mb-4">
                  <div className="card h-100 shadow-sm border-danger">
                    <div className="card-header bg-danger text-white">
                      <div className="d-flex align-items-center">
                        {admin.profile_picture_url ? (
                          <img
                            src={admin.profile_picture_url}
                            alt="Profile"
                            className="rounded-circle me-2"
                            width="40"
                            height="40"
                          />
                        ) : (
                          <div
                            className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2"
                            style={{ width: "40px", height: "40px" }}
                          >
                            <i className="bi bi-person text-muted"></i>
                          </div>
                        )}
                        <div>
                          <h6 className="card-title mb-0">{admin.username}</h6>
                          <small className="text-light">
                            <i className="bi bi-shield-check me-1"></i>
                            {admin.role}
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
                          {admin.first_name} {admin.last_name}
                        </span>
                      </div>

                      <div className="mb-2">
                        <strong className="text-muted">
                          <i className="bi bi-envelope me-1"></i>
                          Email:
                        </strong>
                        <span className="ms-1 text-break">{admin.email}</span>
                      </div>

                      {admin.phone && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-telephone me-1"></i>
                            Teléfono:
                          </strong>
                          <span className="ms-1">{admin.phone}</span>
                        </div>
                      )}

                      <div className="mb-2">
                        <strong className="text-muted">
                          <i className="bi bi-calendar-plus me-1"></i>
                          Registro:
                        </strong>
                        <span className="ms-1">
                          {new Date(admin.date_joined).toLocaleDateString(
                            "es-ES"
                          )}
                        </span>
                      </div>

                      {admin.last_login && (
                        <div className="mb-2">
                          <strong className="text-muted">
                            <i className="bi bi-clock me-1"></i>
                            Último acceso:
                          </strong>
                          <span className="ms-1">
                            {new Date(admin.last_login).toLocaleDateString(
                              "es-ES"
                            )}
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
                            type={showPasswords[admin.id] ? "text" : "password"}
                            value="●●●●●●●●"
                            readOnly
                            className="form-control form-control-sm me-2"
                            style={{
                              backgroundColor: "#f8f9fa",
                              maxWidth: "200px",
                              fontSize: "0.875rem",
                            }}
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => togglePasswordVisibility(admin.id)}
                            style={{ minWidth: "40px" }}
                            title="Las contraseñas están encriptadas"
                          >
                            {showPasswords[admin.id] ? "🙈" : "👁️"}
                          </button>
                        </div>
                        <small className="text-muted">
                          <i className="bi bi-info-circle me-1"></i>
                          Las contraseñas están encriptadas por seguridad
                        </small>
                      </div>

                      {/* Privilegios especiales para admin */}
                      <div className="mt-3 pt-2 border-top">
                        <div className="d-flex flex-wrap gap-1">
                          <span className="badge bg-danger">
                            <i className="bi bi-shield-check me-1"></i>
                            Super Usuario
                          </span>
                          <span className="badge bg-warning text-dark">
                            <i className="bi bi-gear me-1"></i>
                            Gestión Total
                          </span>
                          <span className="badge bg-info">
                            <i className="bi bi-people me-1"></i>
                            Usuarios
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer bg-light">
                      <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-danger btn-sm">
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

export default AdminList;
