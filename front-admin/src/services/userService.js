import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api-django/auth/';

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}users/`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios", error);
    throw error;
  }
};

// Obtener solo los administradores
export const getAdmins = async () => {
  try {
    const response = await axios.get(`${BASE_URL}users/`);
    const adminUsers = response.data.filter(user => user.role === 'admin');
    return adminUsers;
  } catch (error) {
    console.error("Error al obtener los administradores", error);
    throw error;
  }
};

// Crear un administrador
export const createAdmin = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}users/`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

// Actualizar un administrador
export const updateAdmin = async (id, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}users/${id}/`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw error;
  }
};

// Eliminar un administrador
export const deleteAdmin = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}users/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};
