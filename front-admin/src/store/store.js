import { create } from 'zustand';

// ✅ Función para obtener datos iniciales desde localStorage
const getInitialState = () => {
  try {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    
    return {
      user: user ? JSON.parse(user) : null,
      token: token || null
    };
  } catch (error) {
    console.error('Error al cargar datos del localStorage:', error);
    return {
      user: null,
      token: null
    };
  }
};

const useStore = create((set) => ({
  // ✅ Inicializar con datos del localStorage
  ...getInitialState(),
  
  // ✅ Función para actualizar el estado y sincronizar con localStorage
  setUser: (userData, token) => {
    set({ user: userData, token });
    // Sincronizar con localStorage
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  },
  
  // ✅ Función para hacer logout y limpiar localStorage
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }
}));

export default useStore;