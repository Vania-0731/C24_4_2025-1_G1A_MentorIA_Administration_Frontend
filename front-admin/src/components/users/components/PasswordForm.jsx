import React from 'react';

const PasswordForm = ({ formState, updateField, isEditing }) => {
  // Solo mostrar en modo creación para admins
  if (isEditing || formState.role !== "admin") {
    return (
      <>
        {/* Mensaje informativo para estudiantes y profesores */}
        {(formState.role === "student" || formState.role === "professor") && !isEditing && (
          <div className="alert alert-info mb-4">
            <i className="fas fa-info-circle me-2"></i>
            <strong>Información:</strong> Los{" "}
            {formState.role === "student" ? "estudiantes" : "profesores"} no
            requieren contraseña. El acceso se gestiona a través de otros métodos de autenticación.
          </div>
        )}

        {/* Mensaje informativo en modo edición */}
        {isEditing && (
          <div className="alert alert-info mb-4">
            <i className="fas fa-info-circle me-2"></i>
            <strong>Nota:</strong> La contraseña no se puede modificar desde este formulario por razones de seguridad.
          </div>
        )}
      </>
    );
  }

  return (
    <div className="form-section mb-5">
      <div className="d-flex align-items-center mb-4">
        <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
          <i className="fas fa-lock text-warning"></i>
        </div>
        <h5 className="text-warning mb-0 fw-bold">Credenciales de Acceso</h5>
      </div>

      <div className="alert alert-info mb-3">
        <i className="fas fa-info-circle me-2"></i>
        <strong>Importante:</strong> Solo los administradores pueden tener contraseña para acceder al sistema.
      </div>

      <div className="col-12">
        <label htmlFor="password" className="form-label fw-semibold">
          <i className="fas fa-key text-muted me-2"></i>
          Contraseña
          <span className="badge bg-info ms-2">
            <i className="fas fa-magic me-1"></i>Generada automáticamente
          </span>
        </label>
        <div className="input-group input-group-lg">
          <input
            type={formState.showPassword ? "text" : "password"}
            className="form-control bg-light"
            id="password"
            placeholder="Contraseña generada"
            value={formState.password}
            onChange={(e) => updateField('password', e.target.value)}
            required
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => updateField('showPassword', !formState.showPassword)}
          >
            {formState.showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;