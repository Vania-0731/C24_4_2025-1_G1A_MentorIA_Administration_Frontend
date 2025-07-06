import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api-django/auth/users/login/';

// Cambiamos el parámetro a 'credential' para que coincida con el backend
export const login = async (credential) => { 
  try {
    const response = await axios.post(
      API_URL, 
      // Enviamos el objeto con la clave correcta: 'credential'
      { credential }, 
      { 
        headers: { 
          'Content-Type': 'application/json' 
        }
      }
    );
    
    // El resto de la lógica sigue igual
    return {
      token: response.data.token,
      user: {
        id: response.data.user_id,
        username: response.data.username,
        role: response.data.role
      }
    };
  } catch (error) {
    if (error.response) {
      console.error("Error en la respuesta del servidor:", error.response);
      console.error("Detalles del error:", error.response.data);
    } else {
      console.error("Error en la solicitud:", error.message);
    }
    throw error;
  }
};