import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfessors } from "../../services/professorService"; // Importamos el servicio
import UserDetailModal from "./modals/UserDetailModal"; // Importamos el modal reutilizable

function ProfesorList() {
  const navigate = useNavigate();
  const [professors, setProfessors] = useState([]);
  const [filteredProfessors, setFilteredProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Estado para manejar el modal
  const [selectedProfessor, setSelectedProfessor] = useState(null); // Estado para almacenar el profesor seleccionado

  // Filtros
  const [searchName, setSearchName] = useState(""); // Filtro por nombre
  const [academicTitle, setAcademicTitle] = useState(""); // Filtro por título académico

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const data = await getProfessors(); // Usamos el servicio para obtener los profesores
        setProfessors(data);
        setFilteredProfessors(data);
      } catch (error) {
        console.error("Error fetching professors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  // Filtrar profesores según los criterios
  const filterProfessors = () => {
    let filtered = professors;

    // Filtrar por nombre
    if (searchName) {
      filtered = filtered.filter((professor) =>
        `${professor.user_details.first_name} ${professor.user_details.last_name}`
          .toLowerCase()
          .includes(searchName.toLowerCase())
      );
    }

    // Filtrar por título académico
    if (academicTitle) {
      filtered = filtered.filter((professor) =>
        professor.academic_title.toLowerCase().includes(academicTitle.toLowerCase())
      );
    }

    setFilteredProfessors(filtered);
  };

  // Manejo de cambios en los filtros
  useEffect(() => {
    filterProfessors();
  }, [searchName, academicTitle]);

  const handleShowDetails = (professor) => {
    setSelectedProfessor(professor); // Establecer el profesor seleccionado
    setShowModal(true); // Abrir el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
    setSelectedProfessor(null); // Limpiar el profesor seleccionado
  };

  const handleEditUser = (professor) => {
    // Preparar los datos del profesor para el formulario
    const professorForEdit = {
      ...professor,
      username: professor.user_details.username,
      first_name: professor.user_details.first_name,
      last_name: professor.user_details.last_name,
      email: professor.user_details.email,
      phone: professor.user_details.phone,
      profile_picture_url: professor.user_details.profile_picture_url,
      role: "professor"
    };

    // Navegar a la ruta de crear usuario pero pasando el usuario a editar
    navigate('/create-user', { 
      state: { 
        userToEdit: professorForEdit,
        mode: 'edit' 
      } 
    });
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
              Total: {filteredProfessors.length} profesores
            </span>
          </div>

          {/* Filtros de búsqueda */}
          <div className="mb-4">
            {/* Campo de búsqueda por nombre */}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Buscar por nombre..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />

            {/* Campo de búsqueda por título académico */}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Filtrar por título académico..."
              value={academicTitle}
              onChange={(e) => setAcademicTitle(e.target.value)}
            />
          </div>

          {/* Tabla de profesores */}
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Código de Profesor</th>
                  <th>Título Académico</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfessors.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      <div className="alert alert-info">
                        <i className="bi bi-info-circle me-2"></i>
                        No hay profesores registrados
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProfessors.map((professor) => (
                    <tr key={professor.id} style={{ textAlign: "center" }}>
                      <td>
                        {professor.user_details.first_name} {professor.user_details.last_name}
                      </td>
                      <td>{professor.employee_code || "Sin código de empleado"}</td>
                      <td>{professor.academic_title || "Sin título académico"}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => handleShowDetails(professor)}
                            title="Ver detalles"
                          >
                            <i className="bi bi-eye me-1"></i>
                            Ver detalles
                          </button>
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => handleEditUser(professor)}
                            title="Editar usuario"
                          >
                            <i className="bi bi-pencil-square me-1"></i>
                            Editar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal con los detalles del profesor */}
      <UserDetailModal
        show={showModal}
        handleClose={handleCloseModal}
        selectedUser={selectedProfessor}
        userType="Profesor" // Aquí le pasamos el tipo de usuario
      />
    </div>
  );
}

export default ProfesorList;