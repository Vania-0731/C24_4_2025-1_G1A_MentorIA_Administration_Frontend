import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSubjects, deleteSubject } from "../../services/subjectService"; // Importamos las funciones del servicio
import SubjectForm from "./SubjectForm";

const SubjectList = ({ onShowCursoForm }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  useEffect(() => {
    getSubjects() // Llamamos al servicio para obtener las materias
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => {
        console.error("Error al cargar las materias:", error);
      });
  }, []);

  const handleFormSubmit = (subject) => {
    if (selectedSubjectId) {
      setSubjects(
        subjects.map((item) => (item.id === subject.id ? subject : item))
      );
    } else {
      setSubjects([...subjects, subject]);
    }
    setSelectedSubjectId(null); // Limpiar el ID seleccionado después de enviar el formulario
  };

  const handleEditSubject = (id) => {
    setSelectedSubjectId(id); // Seleccionar la materia para editar
  };

  const handleDeleteSubject = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta materia?")) {
      deleteSubject(id)
        .then(() => {
          setSubjects(subjects.filter((subject) => subject.id !== id));
        })
        .catch((error) => {
          console.error("Error al eliminar la materia:", error);
        });
    }
  };

  const handleCancel = () => {
    setSelectedSubjectId(null);
  };

  return (
    <div className="container mt-4">
      {(selectedSubjectId || selectedSubjectId === 0) && (
        <SubjectForm
          subjectId={selectedSubjectId}
          onFormSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Lista de Materias</h2>
          <NavLink className="btn btn-outline-success" to="/create-course">
            <i className="bi bi-plus-square me-2"></i> Nueva Materia
          </NavLink>
        </div>

        {subjects.length === 0 ? (
          <div className="alert alert-info text-center">
            <h5>No hay materias registradas</h5>
            <p className="mb-0">Agrega tu primera materia usando el formulario de arriba.</p>
          </div>
        ) : (
          <div className="row">
            {subjects.map((subject) => (
              <div key={subject.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="card-title mb-0">{subject.name}</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-book me-2 text-warning"></i>
                      <span className="text-muted">Materia académica</span>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent">
                    <div className="d-grid gap-2 d-md-flex">
                      <button
                        className="btn btn-outline-primary btn-sm flex-fill"
                        onClick={() => handleEditSubject(subject.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm flex-fill"
                        onClick={() => handleDeleteSubject(subject.id)}
                      >
                        Eliminar
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
  );
};

export default SubjectList;
