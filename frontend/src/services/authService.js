import api from './api';

export const authService = {
  login: async (email, password, role) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
      role: role.toUpperCase(),
    });
    return response.data;
  },

  register: async (registerDTO) => {
    const response = await api.post('/api/auth/register', registerDTO);
    return response.data;
  },

  logout: () => {
    localStorage.clear();
    window.location.href = '/login';
  },

  getCurrentUser: () => {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      role: localStorage.getItem('role'),
      restaurantId: localStorage.getItem('restaurantId'),
      restaurantName: localStorage.getItem('restaurantName'),
      ngoId: localStorage.getItem('ngoId'),
      ngoName: localStorage.getItem('ngoName'),
      volunteerId: localStorage.getItem('volunteerId'),
      adminId: localStorage.getItem('adminId'),
    };
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
