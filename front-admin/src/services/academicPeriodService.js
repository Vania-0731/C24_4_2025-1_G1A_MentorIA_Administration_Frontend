import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api-django/academic/periods/';

// Obtener todos los períodos académicos
export const getPeriods = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los períodos académicos", error);
    throw error;
  }
};

// Obtener un período académico por su ID
export const getPeriod = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el período académico", error);
    throw error;
  }
};

// Crear un nuevo período académico
export const createPeriod = async (periodData) => {
  try {
    const response = await axios.post(API_URL, periodData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el período académico", error);
    throw error;
  }
};

// Editar un período académico
export const editPeriod = async (id, periodData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, periodData);
    return response.data;
  } catch (error) {
    console.error("Error al editar el período académico", error);
    throw error;
  }
};

// Eliminar un período académico
export const deletePeriod = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
  } catch (error) {
    console.error("Error al eliminar el período académico", error);
    throw error;
  }
};
