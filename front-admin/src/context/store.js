import create from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false, // Estado inicial
  setAuthenticated: (status) => set({ isAuthenticated: status }), // Cambiar el estado de autenticación
}));

export default useAuthStore;
