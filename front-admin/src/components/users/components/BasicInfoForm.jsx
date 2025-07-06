import React from 'react';

const BasicInfoForm = ({ formState, updateField, isEditing }) => {
  return (
    <div className="form-section mb-5">
      <div className="d-flex align-items-center mb-4">
        <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
          <i className="fas fa-info-circle text-primary"></i>
        </div>
        <h5 className="text-primary mb-0 fw-bold">Información Básica</h5>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <label htmlFor="username" className="form-label fw-semibold">
            <i className="fas fa-user text-muted me-2"></i>
            Nombre de Usuario
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="username"
            placeholder="Ingrese el nombre de usuario"
            value={formState.username}
            onChange={(e) => updateField('username', e.target.value)}
            required
            disabled={isEditing}
          />
          {isEditing && (
            <div className="form-text">
              <i className="fas fa-info-circle me-1"></i>
              El nombre de usuario no se puede cambiar
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label fw-semibold">
            <i className="fas fa-user text-muted me-2"></i>
            Nombre
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="firstName"
            placeholder="Nombre"
            value={formState.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label fw-semibold">
            <i className="fas fa-user text-muted me-2"></i>
            Apellido
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="lastName"
            placeholder="Apellido"
            value={formState.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label fw-semibold">
            <i className="fas fa-phone text-muted me-2"></i>
            Teléfono
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="phone"
            placeholder="Número de teléfono"
            value={formState.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="role" className="form-label fw-semibold">
            <i className="fas fa-user-tag text-muted me-2"></i>
            Tipo de Usuario
          </label>
          <select
            className="form-select form-select-lg"
            id="role"
            value={formState.role}
            onChange={(e) => updateField('role', e.target.value)}
            disabled={isEditing}
          >
            <option value="student">Estudiante</option>
            <option value="professor">Profesor</option>
            <option value="admin">Administrador</option>
          </select>
          {isEditing && (
            <div className="form-text">
              <i className="fas fa-info-circle me-1"></i>
              El tipo de usuario no se puede cambiar
            </div>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="email" className="form-label fw-semibold">
            <i className="fas fa-envelope text-muted me-2"></i>
            Correo Electrónico
            {!isEditing && (
              <span className="badge bg-info ms-2">
                <i className="fas fa-magic me-1"></i>Generado automáticamente
              </span>
            )}
          </label>
          <input
            type="email"
            className={`form-control form-control-lg ${!isEditing ? "bg-light" : ""}`}
            id="email"
            placeholder="Email"
            value={formState.email}
            onChange={(e) => updateField('email', e.target.value)}
            readOnly={!isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;