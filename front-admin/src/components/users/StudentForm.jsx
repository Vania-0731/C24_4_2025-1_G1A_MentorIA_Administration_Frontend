import { useState, useEffect } from "react";
import { getPeriods } from "../../services/academicPeriodService"; // Asegúrate de que la importación esté correcta

function StudentForm({
  career,
  setCareer,
  careers,
  studentCode,
  enrollmentDate,
  setEnrollmentDate,
  currentSemester,
  setCurrentSemester,
  averageGrade,
  setAverageGrade,
  periods = [],
  isEditing = false,
}) {
  const [loading, setLoading] = useState(false);
  const [periodsData, setPeriodsData] = useState([]); // Estado para almacenar los períodos

  // Función para cargar los períodos académicos
  useEffect(() => {
    const loadPeriods = async () => {
      setLoading(true);
      try {
        const data = await getPeriods(); // Llamar al servicio
        setPeriodsData(data.results || data); // Almacenar los períodos
      } catch (error) {
        console.error("Error al cargar los períodos académicos", error);
      } finally {
        setLoading(false);
      }
    };

    loadPeriods();
  }, []);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("es-ES", options);
  };

  // Función para calcular el período académico actual
  const getCurrentAcademicPeriod = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // Determinar el período basado en el mes actual
    if (currentMonth >= 3 && currentMonth <= 7) {
      return `${currentYear}-1`; // Primer semestre
    } else if (currentMonth >= 8 && currentMonth <= 12) {
      return `${currentYear}-2`; // Segundo semestre
    } else {
      return `${currentYear - 1}-2`; // Segundo semestre del año anterior
    }
  };

  return (
    <div className="form-section mb-5">
      <div className="d-flex align-items-center mb-4">
        <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
          <i className="fas fa-user-graduate text-success"></i>
        </div>
        <h5 className="text-success mb-0 fw-bold">
          Información del Estudiante
        </h5>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <label htmlFor="career" className="form-label fw-semibold">
            <i className="fas fa-book text-muted me-2"></i>
            Carrera
          </label>
          <select
            className="form-select form-select-lg"
            id="career"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            required
          >
            <option value="">Seleccionar Carrera</option>
            {careers.map((careerOption) => (
              <option key={careerOption.id} value={careerOption.id}>
                {careerOption.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="studentCode" className="form-label fw-semibold">
            <i className="fas fa-id-card text-muted me-2"></i>
            Código de Estudiante
            {!isEditing && (
              <span className="badge bg-info ms-2">
                <i className="fas fa-magic me-1"></i>Generado automáticamente
              </span>
            )}
          </label>
          <input
            type="text"
            className="form-control form-control-lg bg-light"
            id="studentCode"
            placeholder="Código de estudiante"
            value={studentCode}
            readOnly
          />
          {isEditing && (
            <div className="form-text">
              <i className="fas fa-info-circle me-1"></i>
              El código de estudiante no se puede cambiar
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="enrollmentDate" className="form-label fw-semibold">
            <i className="fas fa-calendar-plus text-muted me-2"></i>
            Fecha de Matrícula
          </label>
          <input
            type="date"
            className="form-control form-control-lg"
            id="enrollmentDate"
            value={enrollmentDate}
            onChange={(e) => setEnrollmentDate(e.target.value)}
            required
          />
          {enrollmentDate && (
            <div className="form-text text-muted">
              <i className="fas fa-calendar me-1"></i>
              {formatDate(enrollmentDate)}
            </div>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="period" className="form-label fw-semibold">
            <i className="fas fa-calendar-alt text-muted me-2"></i>
            Período Académico
          </label>
          <select className="form-select form-select-lg" id="period" required>
            <option value="">Seleccionar Período</option>
            {periodsData.map((period) => {
              // Convertir las fechas de inicio y finalización a formato "día de mes de año"
              const startDate = new Date(period.start_date);
              const endDate = new Date(period.end_date);

              const startDay = startDate.getDate();
              const startMonth = startDate.toLocaleString("default", {
                month: "long",
              });
              const startYear = startDate.getFullYear();

              const endDay = endDate.getDate();
              const endMonth = endDate.toLocaleString("default", {
                month: "long",
              });
              const endYear = endDate.getFullYear();

              return (
                <option key={period.id} value={period.id}>
                  {period.name} (comienza el {startDay} de {startMonth} -
                  finaliza el {endDay} de {endMonth})
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="averageGrade" className="form-label fw-semibold">
            <i className="fas fa-chart-line text-muted me-2"></i>
            Promedio Ponderado
          </label>
          <div className="input-group input-group-lg">
            <input
              type="number"
              className="form-control"
              id="averageGrade"
              placeholder="0.00"
              value={averageGrade}
              onChange={(e) => setAverageGrade(parseFloat(e.target.value) || 0)}
              min="0"
              max="20"
              step="0.01"
            />
            <span className="input-group-text">/ 20</span>
          </div>
          <div className="form-text">
            <i className="fas fa-info-circle me-1"></i>
            Ingrese el promedio ponderado del estudiante (0.00 - 20.00)
          </div>
        </div>

        <div className="col-md-6">
          <label className="form-label fw-semibold">
            <i className="fas fa-graduation-cap text-muted me-2"></i>
            Estado Académico
          </label>
          <div className="form-control form-control-lg bg-light d-flex align-items-center">
            {averageGrade >= 15.5 ? (
              <span className="badge bg-success me-2">
                <i className="fas fa-star me-1"></i>Excelente
              </span>
            ) : averageGrade >= 13.0 ? (
              <span className="badge bg-primary me-2">
                <i className="fas fa-thumbs-up me-1"></i>Bueno
              </span>
            ) : averageGrade >= 10.5 ? (
              <span className="badge bg-warning me-2">
                <i className="fas fa-exclamation-triangle me-1"></i>Regular
              </span>
            ) : averageGrade > 0 ? (
              <span className="badge bg-danger me-2">
                <i className="fas fa-times-circle me-1"></i>Deficiente
              </span>
            ) : (
              <span className="badge bg-secondary me-2">
                <i className="fas fa-question me-1"></i>Sin calificar
              </span>
            )}
            <span className="text-muted">
              Promedio: {averageGrade.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Información adicional sobre períodos académicos */}
        <div className="col-12">
          <div className="card bg-light border-0">
            <div className="card-body">
              <h6 className="card-title text-muted mb-3">
                <i className="fas fa-calendar-alt me-2"></i>
                Período Académico Actual
              </h6>
              <div className="row">
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-calendar-day text-success me-2"></i>
                    <div>
                      <small className="text-muted">Período</small>
                      <div className="fw-bold">
                        {getCurrentAcademicPeriod()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-clock text-primary me-2"></i>
                    <div>
                      <small className="text-muted">Semestre</small>
                      <div className="fw-bold">{currentSemester}°</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-user-check text-info me-2"></i>
                    <div>
                      <small className="text-muted">Estado</small>
                      <div className="fw-bold text-success">Activo</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="alert alert-light border-start border-success border-4">
          <div className="d-flex align-items-start">
            <i className="fas fa-lightbulb text-success me-2 mt-1"></i>
            <div>
              <strong>Información importante:</strong>
              <ul className="mb-0 mt-2">
                <li>
                  {isEditing
                    ? "El código de estudiante no se puede modificar"
                    : "El código de estudiante se genera automáticamente basado en nombre y apellido"}
                </li>
                <li>
                  La fecha de matrícula se establece automáticamente al día
                  actual
                </li>
                <li>El promedio ponderado debe estar entre 0.00 y 20.00</li>
                <li>
                  El sistema calcula automáticamente el estado académico según
                  el promedio
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
