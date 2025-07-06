import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCareers,getCareer , createCareer, editCareer, deleteCareer } from "../../services/careerService"; // Importa las funciones del servicio
import CareerForm from "./CareerForm";

const CareerList = ({ onShowCarreraForm }) => {
  const [careers, setCareers] = useState([]);
  const [selectedCareerId, setSelectedCareerId] = useState(null);

  useEffect(() => {
    getCareers()
      .then((data) => {
        setCareers(data);
      })
      .catch((error) => {
        console.error("Error al cargar las carreras:", error);
      });
  }, []);

  const handleFormSubmit = (career) => {
    if (selectedCareerId) {
      // Editar carrera
      editCareer(selectedCareerId, career)
        .then((updatedCareer) => {
          setCareers(
            careers.map((item) =>
              item.id === updatedCareer.id ? updatedCareer : item
            )
          );
        })
        .catch((error) => console.error("Error al editar carrera", error));
    } else {
      // Crear nueva carrera
      createCareer(career)
        .then((newCareer) => {
          setCareers([...careers, newCareer]);
        })
        .catch((error) => console.error("Error al crear carrera", error));
    }
    setSelectedCareerId(null); // Limpiar el ID seleccionado después de enviar el formulario
  };

  const handleEditCareer = (id) => {
    setSelectedCareerId(id); // Seleccionar carrera para editar
  };

  const handleDeleteCareer = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta carrera?")) {
      deleteCareer(id)
        .then(() => {
          setCareers(careers.filter((career) => career.id !== id)); // Eliminar carrera de la lista
        })
        .catch((error) => {
          console.error("Error al eliminar la carrera:", error);
        });
    }
  };

  // Función para manejar la cancelación
  const handleCancel = () => {
    setSelectedCareerId(null); // Limpiar el ID seleccionado y cancelar la edición
  };

  return (
    <div className="container mt-4">
      {/* Solo renderizar el formulario si hay una carrera seleccionada para editar o si estamos creando una nueva */}
      {(selectedCareerId || selectedCareerId === 0) && (
        <CareerForm
          careerId={selectedCareerId}
          onFormSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Lista de Carreras</h2>
          <NavLink
            className="btn btn-outline-success"
            to="/create-career"
          >
            <i className="bi bi-plus-square me-2"></i> Nueva Carrera
          </NavLink>
        </div>

        {careers.length === 0 ? (
          <div className="alert alert-info text-center">
            <h5>No hay carreras registradas</h5>
            <p className="mb-0">
              Agrega tu primera carrera usando el formulario de arriba.
            </p>
          </div>
        ) : (
          <div className="row">
            {careers.map((career) => (
              <div key={career.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-header bg-success text-white">
                    <h5 className="card-title mb-0">{career.name}</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <span className="badge bg-primary fs-6">
                        {career.code}
                      </span>
                    </div>
                    <p className="card-text text-muted">
                      Código de carrera: <strong>{career.code}</strong>
                    </p>
                  </div>
                  <div className="card-footer bg-transparent">
                    <div className="d-grid gap-2 d-md-flex">
                      <button
                        className="btn btn-outline-primary btn-sm flex-fill"
                        onClick={() => handleEditCareer(career.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm flex-fill"
                        onClick={() => handleDeleteCareer(career.id)}
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

export default CareerList;
