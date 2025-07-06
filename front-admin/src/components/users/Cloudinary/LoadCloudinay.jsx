const loadCloudinaryScript = () => {
    return new Promise((resolve, reject) => {
      if (window.cloudinary) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Error al cargar Cloudinary"));
      document.head.appendChild(script);
    });
  };
  export default loadCloudinaryScript;