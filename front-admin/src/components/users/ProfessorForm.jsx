function ProfessorForm({
  employeeCode,
  hireDate,
  setHireDate,
  department,
  setDepartment,
  academicTitle,
  setAcademicTitle,
  officeLocation,
  setOfficeLocation,
  isEditing = false
}) {
  return (
    <div className="form-section mb-5">
      <div className="d-flex align-items-center mb-4">
        <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
          <i className="fas fa-chalkboard-teacher text-info"></i>
        </div>
        <h5 className="text-info mb-0 fw-bold">Información del Profesor</h5>
      </div>
      
      <div className="row g-3">
        <div className="col-12">
          <label htmlFor="employeeCode" className="form-label fw-semibold">
            <i className="fas fa-id-badge text-muted me-2"></i>
            Código de Empleado
            {!isEditing && (
              <span className="badge bg-info ms-2">
                <i className="fas fa-magic me-1"></i>Generado automáticamente
              </span>
            )}
          </label>
          <input
            type="text"
            className="form-control form-control-lg bg-light"
            id="employeeCode"
            placeholder="Código de empleado"
            value={employeeCode}
            readOnly
          />
          {isEditing && (
            <div className="form-text">
              <i className="fas fa-info-circle me-1"></i>
              El código de empleado no se puede cambiar
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="hireDate" className="form-label fw-semibold">
            <i className="fas fa-calendar-alt text-muted me-2"></i>
            Fecha de Contratación
          </label>
          <input
            type="date"
            className="form-control form-control-lg"
            id="hireDate"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
            required
          />
        </div>
        
        <div className="col-md-6">
          <label htmlFor="department" className="form-label fw-semibold">
            <i className="fas fa-building text-muted me-2"></i>
            Departamento
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="department"
            placeholder="Ej: Ingeniería de Sistemas"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="academicTitle" className="form-label fw-semibold">
            <i className="fas fa-graduation-cap text-muted me-2"></i>
            Título Académico
          </label>
          <select
            className="form-select form-select-lg"
            id="academicTitle"
            value={academicTitle}
            onChange={(e) => setAcademicTitle(e.target.value)}
            required
          >
            <option value="">Seleccionar Título</option>
            <option value="Dr.">Dr. - Doctor</option>
            <option value="Mg.">Mg. - Magíster</option>
            <option value="Ing.">Ing. - Ingeniero</option>
            <option value="Lic.">Lic. - Licenciado</option>
            <option value="Prof.">Prof. - Profesor</option>
            <option value="MBA">MBA - Master in Business Administration</option>
          </select>
        </div>
        
        <div className="col-md-6">
          <label htmlFor="officeLocation" className="form-label fw-semibold">
            <i className="fas fa-map-marker-alt text-muted me-2"></i>
            Ubicación de Oficina
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="officeLocation"
            placeholder="Ej: Piso 2, Oficina 201"
            value={officeLocation}
            onChange={(e) => setOfficeLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3">
        <div className="alert alert-light border-start border-info border-4">
          <div className="d-flex align-items-start">
            <i className="fas fa-lightbulb text-info me-2 mt-1"></i>
            <div>
              <strong>Información importante:</strong>
              <ul className="mb-0 mt-2">
                <li>
                  {isEditing 
                    ? 'El código de empleado no se puede modificar'
                    : 'El código de empleado se genera automáticamente'
                  }
                </li>
                <li>La fecha de contratación es obligatoria</li>
                <li>El departamento debe corresponder al área académica</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessorForm;