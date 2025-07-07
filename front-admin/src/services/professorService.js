import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_DJANGO_URL}auth/professors/`;

// Obtener todos los profesores
export const getProfessors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los profesores", error);
    throw error;
  }
};

// Obtener un profesor por ID
export const getProfessor = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el profesor", error);
    throw error;
  }
};

// Crear un profesor
export const createProfessor = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating professor:", error);
    throw error;
  }
};

// Actualizar un profesor
export const updateProfessor = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating professor:", error);
    throw error;
  }
};

// Eliminar un profesor
export const deleteProfessor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting professor:", error);
    throw error;
  }
};