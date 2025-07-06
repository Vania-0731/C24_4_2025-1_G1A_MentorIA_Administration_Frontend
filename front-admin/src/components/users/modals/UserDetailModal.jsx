import { Modal } from "react-bootstrap";
import '../../../css/modal.css'
const UserDetailModal = ({ show, handleClose, selectedUser, userType, handleEditClick }) => {
  if (!selectedUser) return null;

  // Función para obtener la URL de la imagen de perfil según el tipo de usuario
  const getProfilePictureUrl = () => {
    switch (userType) {
      case "Administrador":
        return selectedUser.profile_picture_url;
      case "Profesor":
        return selectedUser.user_details?.profile_picture_url || selectedUser.profile_picture_url;
      case "Estudiante":
      default:
        return selectedUser.user_details?.profile_picture_url || selectedUser.profile_picture_url;
    }
  };

  // Función para obtener el nombre completo según el tipo de usuario
  const getFullName = () => {
    switch (userType) {
      case "Administrador":
        return `${selectedUser.first_name} ${selectedUser.last_name}`;
      case "Profesor":
        return `${selectedUser.user_details?.first_name || ''} ${selectedUser.user_details?.last_name || ''}`;
      case "Estudiante":
      default:
        return `${selectedUser.user_details?.first_name || ''} ${selectedUser.user_details?.last_name || ''}`;
    }
  };

  const profilePictureUrl = getProfilePictureUrl();
  const fullName = getFullName();

  const renderUserDetails = () => {
    switch (userType) {
      case "Administrador":
        return (
          <>
            <p><strong>Nombre:</strong> {selectedUser.first_name} {selectedUser.last_name}</p>
            <p><strong>Código de Administrador:</strong> {selectedUser.employee_code}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Teléfono:</strong> {selectedUser.phone}</p>
            <p><strong>Fecha de Registro:</strong> {new Date(selectedUser.date_joined).toLocaleDateString("es-ES")}</p>
            {selectedUser.last_login && (
              <p><strong>Último acceso:</strong> {new Date(selectedUser.last_login).toLocaleDateString("es-ES")}</p>
            )}
            <p><strong>Rol:</strong> {selectedUser.role}</p>
          </>
        );
     
      case "Profesor":
        return (
          <>
            <p><strong>Nombre:</strong> {selectedUser.user_details.first_name} {selectedUser.user_details.last_name}</p>
            <p><strong>Código de Profesor:</strong> {selectedUser.employee_code || "No disponible"}</p>
            <p><strong>Email:</strong> {selectedUser.user_details.email || "No disponible"}</p>
            <p><strong>Teléfono:</strong> {selectedUser.user_details.phone || "No disponible"}</p>
            <p><strong>Departamento:</strong> {selectedUser.department || "No especificado"}</p>
            <p><strong>Título Académico:</strong> {selectedUser.academic_title || "No especificado"}</p>
            <p><strong>Ubicación de Oficina:</strong> {selectedUser.office_location || "No especificada"}</p>
            <p><strong>Fecha de Contratación:</strong> {new Date(selectedUser.hire_date).toLocaleDateString("es-ES")}</p>
            <p><strong>Estado:</strong> {selectedUser.status ? "Activo" : "Inactivo"}</p>
          </>
        );
     
      case "Estudiante":
      default:
        return (
          <>
            <p><strong>Nombre:</strong> {selectedUser.user_details.first_name} {selectedUser.user_details.last_name}</p>
            <p><strong>Código de Estudiante:</strong> {selectedUser.student_code}</p>
            <p><strong>Email:</strong> {selectedUser.user_details.email}</p>
            <p><strong>Teléfono:</strong> {selectedUser.user_details.phone}</p>
            <p><strong>Carrera:</strong> {selectedUser.career_name || "Sin carrera asignada"}</p>
            <p><strong>Fecha de Matrícula:</strong> {new Date(selectedUser.enrollment_date).toLocaleDateString("es-ES")}</p>
            <p><strong>Semestre Actual:</strong> {selectedUser.current_semester}°</p>
            <p><strong>Promedio:</strong> {selectedUser.average_grade}</p>
          </>
        );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <i className="fas fa-user-circle me-2"></i>
          Detalles del {userType}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="row">
          {/* Sección de la imagen de perfil */}
          <div className="col-md-4 text-center mb-4">
            <div className="profile-picture-container">
              {profilePictureUrl ? (
                <div className="position-relative">
                  <img
                    src={profilePictureUrl}
                    alt={`Foto de ${fullName}`}
                    className="img-fluid rounded-circle shadow-lg mb-3"
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "cover",
                      border: "4px solid #e9ecef",
                      transition: "transform 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                  />
                  {/* Botón para ver imagen en tamaño completo */}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary position-absolute"
                    style={{
                      bottom: "10px",
                      right: "10px",
                      borderRadius: "50%",
                      width: "35px",
                      height: "35px",
                      padding: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onClick={() => window.open(profilePictureUrl, '_blank')}
                    title="Ver imagen completa"
                  >
                    <i className="fas fa-expand-alt"></i>
                  </button>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center">
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3 shadow-sm"
                    style={{
                      width: "180px",
                      height: "180px",
                      border: "4px solid #e9ecef"
                    }}
                  >
                    <i 
                      className="fas fa-user text-muted" 
                      style={{ fontSize: "4rem" }}
                    ></i>
                  </div>
                  <span className="text-muted small">
                    <i className="fas fa-image me-1"></i>
                    Sin imagen de perfil
                  </span>
                </div>
              )}
            </div>
            
            {/* Nombre del usuario debajo de la imagen */}
            <div className="mt-3">
              <h5 className="text-primary fw-bold mb-1">{fullName}</h5>
              <p className="text-muted mb-0">
                <i className="fas fa-user-tag me-1"></i>
                {userType}
              </p>
            </div>
          </div>

          {/* Sección de detalles del usuario */}
          <div className="col-md-8">
            <div className="user-details">
              <h6 className="text-primary fw-bold mb-3 border-bottom pb-2">
                <i className="fas fa-info-circle me-2"></i>
                Información Personal
              </h6>
              <div className="details-content">
                {renderUserDetails()}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-light">
        <button 
          className="btn btn-primary me-2"
          onClick={handleEditClick}
        >
          <i className="fas fa-edit me-2"></i>
          Editar
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={handleClose}
        >
          <i className="fas fa-times me-2"></i>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetailModal;