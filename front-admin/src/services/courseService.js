import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api-django/courses/courses/';

export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los cursos", error);
    throw error;
  }
};
