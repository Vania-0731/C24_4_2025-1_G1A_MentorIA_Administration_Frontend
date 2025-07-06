import loadCloudinaryScript from './LoadCloudinay';

const openCloudinaryWidget = async (setIsUploading, setProfilePictureUrl) => {
  try {
    // Cargar script si no está disponible
    await loadCloudinaryScript();

    if (!window.cloudinary) {
      alert(
        "Error: No se pudo cargar Cloudinary. Verifica tu conexión a internet."
      );
      return;
    }

    // Obtener variables de entorno
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    // Verificar variables de entorno
    if (!cloudName || !uploadPreset) {
      alert(`Error: Configuración de Cloudinary incompleta.
      
Valores detectados:
- Cloud Name: ${cloudName || "NO ENCONTRADO"}
- Upload Preset: ${uploadPreset || "NO ENCONTRADO"}

Verifica que tu archivo .env esté en la raíz del proyecto y que las variables tengan el prefijo VITE_`);
      return;
    }

    setIsUploading(true);

    const cloudinaryWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ["local", "url", "camera"],
        multiple: false,
        maxFileSize: 5000000, // 5MB
        maxImageWidth: 1000,
        maxImageHeight: 1000,
        cropping: true,
        croppingAspectRatio: 1,
        folder: "profile_pictures",
        publicId: `user_${Date.now()}`,
        clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
        showUploadMoreButton: false,
        theme: "minimal",
        text: {
          "sources.local.title": "Subir desde tu dispositivo",
          "sources.url.title": "Subir desde URL",
          "sources.camera.title": "Tomar foto",
        },
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#90A0B3",
            tabIcon: "#0078FF",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#0078FF",
            action: "#FF620C",
            inactiveTabIcon: "#0E2F5A",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#E4EBF1",
          },
          frame: {
            background: "#FFFFFF",
          },
        },
      },
      (error, result) => {
        if (error) {
          // Mostrar error específico
          let errorMessage = "Error al subir la imagen";
          if (error.message) {
            errorMessage += `: ${error.message}`;
          } else if (typeof error === "string") {
            errorMessage += `: ${error}`;
          }

          alert(errorMessage);
          setIsUploading(false);
          return;
        }

        if (result) {
          if (result.event === "success") {
            setProfilePictureUrl(result.info.secure_url);
            alert("¡Imagen cargada exitosamente!");
            setIsUploading(false);
          } else if (result.event === "abort") {
            setIsUploading(false);
          } else if (result.event === "close") {
            setIsUploading(false);
          }
        }
      }
    );

    cloudinaryWidget.open();
  } catch (error) {
    setIsUploading(false);
    alert(
      "Error al cargar el widget de imágenes. Verifica tu conexión e inténtalo de nuevo."
    );
  }
};

export default openCloudinaryWidget;