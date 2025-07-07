import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_DJANGO_URL}academic/subjects/`;

// Obtener todas las materias
export const getSubjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las materias", error);
    throw error;
  }
};

// Obtener una materia específica por su ID
export const getSubject = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos de la materia", error);
    throw error;
  }
};

// Crear una nueva materia
export const createSubject = async (subjectData) => {
  try {
    const response = await axios.post(API_URL, subjectData);
    return response.data;
  } catch (error) {
    console.error("Error al crear la materia", error);
    throw error;
  }
};

// Editar una materia
export const editSubject = async (id, subjectData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, subjectData);
    return response.data;
  } catch (error) {
    console.error("Error al editar la materia", error);
    throw error;
  }
};

// Eliminar una materia
export const deleteSubject = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
  } catch (error) {
    console.error("Error al eliminar la materia", error);
    throw error;
  }
};
