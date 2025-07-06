import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  getPeriods,
  deletePeriod,
  editPeriod,
} from "../../services/academicPeriodService";
import AcademicPeriodForm from "./AcademicPeriodForm";

const AcademicPeriodList = () => {
  const [periods, setPeriods] = useState([]);
  const [selectedPeriodId, setSelectedPeriodId] = useState(null);

  useEffect(() => {
    loadPeriods();
  }, []);

  const loadPeriods = async () => {
    try {
      const data = await getPeriods();
      setPeriods(data);
    } catch (error) {
      console.error("Error al cargar los períodos académicos:", error);
    }
  };

  const handleEditPeriod = (id) => {
    setSelectedPeriodId(id);
  };

  const handleDeletePeriod = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este período académico?")) {
      try {
        await deletePeriod(id);
        setPeriods(periods.filter((period) => period.id !== id));
      } catch (error) {
        console.error("Error al eliminar el período académico:", error);
      }
    }
  };

  const handleCancelForm = () => {
    setSelectedPeriodId(null);
    loadPeriods();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="container mt-4">
      {/* Formulario solo si es modo edición */}
      {selectedPeriodId && (
        <AcademicPeriodForm
          periodId={selectedPeriodId}
          onCancel={handleCancelForm}
        />
      )}

      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Lista de Períodos Académicos</h2>
          <NavLink className="btn btn-outline-success" to="/create-period">
            <i className="bi bi-plus-square me-2"></i> Nuevo Período
          </NavLink>
        </div>

        {periods.length === 0 ? (
          <div className="alert alert-info text-center">
            <h5>No hay períodos académicos registrados</h5>
            <p className="mb-0">
              Agrega tu primer período académico usando el botón "Nuevo Período".
            </p>
          </div>
        ) : (
          <div className="row">
            {periods.map((period) => (
              <div key={period.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card h-100">
                  <div className="card-header bg-primary text-white">
                    <h5 className="card-title mb-0">{period.name}</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-2">
                      <strong>Año:</strong> {period.year}
                    </div>
                    <div className="mb-2">
                      <strong>Término:</strong> {period.term}
                    </div>
                    {period.start_date && (
                      <div className="mb-2">
                        <strong>Inicio:</strong> {formatDate(period.start_date)}
                      </div>
                    )}
                    {period.end_date && (
                      <div className="mb-3">
                        <strong>Fin:</strong> {formatDate(period.end_date)}
                      </div>
                    )}
                  </div>
                  <div className="card-footer bg-transparent">
                    <div className="d-grid gap-2 d-md-flex">
                      <button
                        className="btn btn-outline-primary btn-sm flex-fill"
                        type="button"
                        onClick={() => handleEditPeriod(period.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm flex-fill"
                        type="button"
                        onClick={() => handleDeletePeriod(period.id)}
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

export default AcademicPeriodList;
