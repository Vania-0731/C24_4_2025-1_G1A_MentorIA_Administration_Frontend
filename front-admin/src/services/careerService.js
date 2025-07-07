import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_DJANGO_URL}academic/careers/`;

// Obtener todas las carreras
export const getCareers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las carreras:", error);
    throw error;
  }
};
// Obtener carrera por ID
export const getCareer = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la carrera:", error);
    throw error;
  }
};


// Crear una nueva carrera
export const createCareer = async (careerData) => {
  try {
    const response = await axios.post(API_URL, careerData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la carrera:", error);
    throw error;
  }
};

// Editar una carrera
export const editCareer = async (id, careerData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, careerData);
    return response.data;
  } catch (error) {
    console.error("Error al editar la carrera:", error);
    throw error;
  }
};

// Eliminar una carrera
export const deleteCareer = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
  } catch (error) {
    console.error("Error al eliminar la carrera:", error);
    throw error;
  }
};
