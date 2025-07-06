import { getStudents } from './studentService'; // Asume que guardaste tu servicio de estudiantes como studentService.js
import { getCourses } from './courseService';   // Asume que guardaste tu servicio de cursos como courseService.js
import { getPeriods } from './academicPeriodService';   // Asume que guardaste tu servicio de períodos como periodService.js

const API_BASE_URL = 'http://localhost:8000/api-django/courses/enrollments/'; // Asegúrate de que esta sea la URL correcta

const enrollmentService = {
  // Función para obtener la lista de matrículas
  getAllEnrollments: async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      throw error;
    }
  },

  // Función para crear una nueva matrícula
  createEnrollment: async (enrollmentData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Aquí puedes añadir encabezados adicionales si tu API lo requiere (e.g., tokens de autenticación)
          // 'Authorization': `Token your_auth_token`,
        },
        body: JSON.stringify(enrollmentData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error desconocido al crear matrícula' }));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating enrollment:", error);
      throw error;
    }
  },

  // Funciones para obtener opciones de selects, usando los servicios importados
  getStudents: async () => {
    return await getStudents(); // Llama a la función getStudents del archivo studentService.js
  },

  getCourses: async () => {
    return await getCourses(); // Llama a la función getCourses del archivo courseService.js
  },

  getPeriods: async () => {
    return await getPeriods(); // Llama a la función getPeriods del archivo periodService.js
  },
};

export default enrollmentService;