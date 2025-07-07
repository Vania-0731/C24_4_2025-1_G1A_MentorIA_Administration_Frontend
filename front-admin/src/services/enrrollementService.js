import axios from 'axios';

const API_BASE_URL_ENROLLMENTS = `${import.meta.env.VITE_API_DJANGO_URL}courses/enrollments/`;
const API_BASE_URL_STUDENTS = `${import.meta.env.VITE_API_DJANGO_URL}auth/students/`;
const API_BASE_URL_COURSES = `${import.meta.env.VITE_API_DJANGO_URL}courses/courses/`;
const API_BASE_URL_PERIODS = `${import.meta.env.VITE_API_DJANGO_URL}academic/periods/`;

const enrollmentService = {
  getAllEnrollments: async () => {
    try {
      const response = await axios.get(API_BASE_URL_ENROLLMENTS);
      return response.data;
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      throw error;
    }
  },

  createEnrollment: async (enrollmentData) => {
    try {
      const response = await axios.post(API_BASE_URL_ENROLLMENTS, enrollmentData);
      return response.data;
    } catch (error) {
      console.error("Error creating enrollment:", error);
      console.error("Response data:", error.response?.data);
      console.error("Response status:", error.response?.status);
      console.error("Response headers:", error.response?.headers);
      throw error;
    }
  },
  getStudents: async () => {
    try {
      const response = await axios.get(API_BASE_URL_STUDENTS);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
      throw error;
    }
  },

  getCourses: async () => {
    try {
      const response = await axios.get(API_BASE_URL_COURSES);
      const courses = response.data;
      const coursesWithDetails = await Promise.all(
        courses.map(async (course) => {
          try {
            // Obtener detalles del subject
            const subjectResponse = await axios.get(course.subject);
            const subjectData = subjectResponse.data;

            // Obtener detalles del professor
            const professorResponse = await axios.get(course.professor);
            const professorData = professorResponse.data;

            return {
              ...course,
              subject_details: subjectData,
              professor_details: professorData,
              display_name: `${subjectData.name || subjectData.title || 'Sin nombre'} - ${professorData.first_name} ${professorData.last_name}`
            };
          } catch (error) {
            console.error(`Error obteniendo detalles del curso ${course.id}:`, error);
            return {
              ...course,
              display_name: `Curso ${course.id} - Error al cargar detalles`
            };
          }
        })
      );
      return coursesWithDetails;
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
      throw error;
    }
  },

  getPeriods: async () => {
    try {
      const response = await axios.get(API_BASE_URL_PERIODS);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los períodos académicos:", error);
      throw error;
    }
  },
};

export default enrollmentService;