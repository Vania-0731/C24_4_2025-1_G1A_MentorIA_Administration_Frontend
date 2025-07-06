import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api-django/auth/students/';

// Obtener todos los estudiantes
export const getStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los estudiantes", error);
    throw error;
  }
};

// Obtener un estudiante por ID
export const getStudent = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el estudiante", error);
    throw error;
  }
};

// Crear un estudiante
export const createStudent = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

// Actualizar un estudiante
export const updateStudent = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

// Eliminar un estudiante
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};