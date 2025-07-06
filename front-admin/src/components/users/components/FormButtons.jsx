import React from 'react';

const FormButtons = ({ isEditing, isSubmitting, isUploading, onCancel }) => {
  return (
    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
      <button
        type="submit"
        className="btn btn-primary btn-lg px-5 me-md-2"
        disabled={isUploading || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <i className="fas fa-spinner fa-spin me-2"></i>
            {isEditing ? "Guardando..." : "Creando..."}
          </>
        ) : (
          <>
            <i className={`fas ${isEditing ? "fa-save" : "fa-plus-circle"} me-2`}></i>
            {isEditing ? "Guardar Cambios" : "Crear Usuario"}
          </>
        )}
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary btn-lg px-5"
        onClick={onCancel}
        disabled={isUploading || isSubmitting}
      >
        <i className={`fas ${isEditing ? "fa-arrow-left" : "fa-redo"} me-2`}></i>
        {isEditing ? "Volver" : "Limpiar Formulario"}
      </button>
    </div>
  );
};

export default FormButtons;