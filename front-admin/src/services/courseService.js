import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_DJANGO_URL}courses/courses/`;

export const getCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los cursos", error);
    throw error;
  }
};
