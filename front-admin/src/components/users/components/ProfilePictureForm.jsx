import React from 'react';
import removeProfilePicture from '../Cloudinary/closeCloudinary';
import openCloudinaryWidget from '../Cloudinary/openCloudinary';

const ProfilePictureForm = ({ 
  profilePictureUrl, 
  setProfilePictureUrl, 
  isUploading, 
  setIsUploading 
}) => {
  const handleOpenCloudinaryWidget = () => {
    openCloudinaryWidget(setIsUploading, setProfilePictureUrl);
  };

  const handleRemoveProfilePicture = () => {
    removeProfilePicture(setProfilePictureUrl);
  };

  return (
    <div className="form-section mb-5">
      <div className="d-flex align-items-center mb-4">
        <div className="bg-secondary bg-opacity-10 rounded-circle p-2 me-3">
          <i className="fas fa-image text-secondary"></i>
        </div>
        <h5 className="text-secondary mb-0 fw-bold">Imagen de Perfil</h5>
      </div>

      <div className="col-12">
        <label className="form-label fw-semibold">
          <i className="fas fa-image text-muted me-2"></i>
          Imagen de Perfil
        </label>

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-primary btn-lg"
            onClick={handleOpenCloudinaryWidget}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <i className="fas fa-spinner fa-spin me-2"></i>
                Subiendo...
              </>
            ) : (
              <>
                <i className="fas fa-cloud-upload-alt me-2"></i>
                {profilePictureUrl ? "Cambiar Imagen" : "Subir Imagen"}
              </>
            )}
          </button>
        </div>

        {profilePictureUrl && (
          <div className="mt-3">
            <div className="card" style={{ maxWidth: "300px" }}>
              <div className="card-body text-center">
                <p className="card-title fw-semibold mb-3">
                  <i className="fas fa-user-circle text-primary me-2"></i>
                  Imagen actual
                </p>
                <img
                  src={profilePictureUrl}
                  alt="Foto de perfil"
                  className="img-fluid rounded-circle shadow-sm mb-3"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    border: "3px solid #e9ecef",
                  }}
                />
                <div className="d-flex gap-2 justify-content-center">
                  <a
                    href={profilePictureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-info"
                  >
                    <i className="fas fa-external-link-alt me-1"></i>
                    Ver completa
                  </a>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={handleRemoveProfilePicture}
                  >
                    <i className="fas fa-trash-alt me-1"></i>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="form-text">
          <i className="fas fa-info-circle me-1"></i>
          Formatos soportados: JPG, PNG, GIF, WEBP. Tamaño máximo: 5MB.
          <br />
          <i className="fas fa-crop me-1"></i>
          La imagen se recortará automáticamente para mantener proporción 1:1.
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureForm;
