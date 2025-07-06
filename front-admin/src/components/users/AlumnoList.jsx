import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getStudents } from "../../services/studentService";
import { getCareers } from "../../services/careerService"; // Importamos el servicio de carreras
import axios from "axios";
import UserDetailModal from "./modals/UserDetailModal"; // Importamos el modal reutilizable

function AlumnoList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [careers, setCareers] = useState([]); // Estado para las carreras
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filtros
  const [searchName, setSearchName] = useState(""); // Filtro por nombre
  const [selectedCareer, setSelectedCareer] = useState(""); // Filtro por carrera
  const [selectedSemester, setSelectedSemester] = useState(""); // Filtro por semestre

  // Cargar carreras
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const careerData = await getCareers();
        setCareers(careerData); // Asignamos las carreras al estado
      } catch (error) {
        console.error("Error fetching careers:", error);
      }
    };

    fetchCareers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await getStudents();

        const studentsWithCareers = await Promise.all(
          studentData.map(async (student) => {
            const careerResponse = await axios.get(student.career);
            const careerName = careerResponse.data.name;
            return { ...student, career_name: careerName };
          })
        );

        setStudents(studentsWithCareers);
        setFilteredStudents(studentsWithCareers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar estudiantes según los criterios
  const filterStudents = () => {
    let filtered = students;

    if (searchName) {
      filtered = filtered.filter((student) =>
        `${student.user_details.first_name} ${student.user_details.last_name}`
          .toLowerCase()
          .includes(searchName.toLowerCase())
      );
    }

    if (selectedCareer) {
      filtered = filtered.filter(
        (student) => student.career_name === selectedCareer
      );
    }

    if (selectedSemester) {
      filtered = filtered.filter(
        (student) => student.current_semester === parseInt(selectedSemester)
      );
    }

    setFilteredStudents(filtered);
  };

  // Manejo de cambios en los filtros
  useEffect(() => {
    filterStudents();
  }, [searchName, selectedCareer, selectedSemester]);

  const handleShowDetails = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const handleEditUser = (student) => {
    // Preparar los datos del estudiante para el formulario
    const studentForEdit = {
      ...student,
      username: student.user_details.username,
      first_name: student.user_details.first_name,
      last_name: student.user_details.last_name,
      email: student.user_details.email,
      phone: student.user_details.phone,
      profile_picture_url: student.user_details.profile_picture_url,
      role: "student"
    };

    // Navegar a la ruta de crear usuario pero pasando el usuario a editar
    navigate('/create-user', { 
      state: { 
        userToEdit: studentForEdit,
        mode: 'edit' 
      } 
    });
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
              Total: {filteredStudents.length} estudiantes
            </span>
          </div>

          {/* Filtros */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Buscar por nombre..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />

            {/* Filtro por carrera */}
            <select
              className="form-select mb-2"
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
            >
              <option value="">Filtrar por carrera</option>
              {careers.map((career) => (
                <option key={career.id} value={career.name}>
                  {career.name}
                </option>
              ))}
            </select>

            {/* Filtro por semestre */}
            <select
              className="form-select mb-2"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="">Filtrar por semestre</option>
              <option value="1">1er Semestre</option>
              <option value="2">2do Semestre</option>
              <option value="3">3er Semestre</option>
              {/* Agregar más opciones de semestre */}
            </select>
          </div>

          {/* Tabla de estudiantes */}
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Código de Estudiante</th>
                  <th>Carrera</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      <div className="alert alert-info">
                        <i className="bi bi-info-circle me-2"></i>
                        No hay estudiantes registrados
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id} style={{ textAlign: "center" }}>
                      <td>
                        {student.user_details.first_name}{" "}
                        {student.user_details.last_name}
                      </td>
                      <td>{student.student_code}</td>
                      <td>{student.career_name || "Sin carrera asignada"}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleShowDetails(student)}
                            title="Ver detalles"
                          >
                            <i className="bi bi-eye me-1"></i>
                            Ver detalles
                          </button>
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => handleEditUser(student)}
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

      {/* Modal con los detalles del estudiante */}
      <UserDetailModal
        show={showModal}
        handleClose={handleCloseModal}
        selectedUser={selectedStudent}
        userType="Estudiante"
      />
    </div>
  );
}

export default AlumnoList;