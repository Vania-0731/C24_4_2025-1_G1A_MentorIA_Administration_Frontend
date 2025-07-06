// Función para eliminar imagen
const removeProfilePicture = (setProfilePictureUrl) => {
  if (confirm("¿Estás seguro de que quieres eliminar la imagen de perfil?")) {
    setProfilePictureUrl("");
  }
};

export default removeProfilePicture;