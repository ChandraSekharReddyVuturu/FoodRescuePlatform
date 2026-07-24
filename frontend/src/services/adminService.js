import api from './api';

export const adminService = {
  approveRestaurant: async (id) => {
    const response = await api.put(`/api/admin/restaurants/${id}/approve`);
    return response.data;
  },

  rejectRestaurant: async (id) => {
    const response = await api.put(`/api/admin/restaurants/${id}/reject`);
    return response.data;
  },

  blockRestaurant: async (id) => {
    const response = await api.put(`/api/admin/restaurants/${id}/block`);
    return response.data;
  },

  unblockRestaurant: async (id) => {
    const response = await api.put(`/api/admin/restaurants/${id}/unblock`);
    return response.data;
  },

  approveNgo: async (id) => {
    const response = await api.put(`/api/admin/ngos/${id}/approve`);
    return response.data;
  },

  rejectNgo: async (id) => {
    const response = await api.put(`/api/admin/ngos/${id}/reject`);
    return response.data;
  },

  blockNgo: async (id) => {
    const response = await api.put(`/api/admin/ngos/${id}/block`);
    return response.data;
  },

  unblockNgo: async (id) => {
    const response = await api.put(`/api/admin/ngos/${id}/unblock`);
    return response.data;
  },

  registerAdmin: async (adminData) => {
    const response = await api.post('/api/admin/register', adminData);
    return response.data;
  },

  getDashboardData: async () => {
    const response = await api.get('/api/admin/dashboard');
    return response.data;
  },

  getRecentDonations: async () => {
    const response = await api.get('/api/admin/recent-donations');
    return response.data;
  },

  getRecentUsers: async () => {
    const response = await api.get('/api/admin/recent-users');
    return response.data;
  },

  getRestaurants: async () => {
    const response = await api.get('/api/admin/restaurants');
    return response.data;
  },

  getNgos: async () => {
    const response = await api.get('/api/admin/admin-ngos');
    return response.data;
  },

  getVolunteers: async () => {
    const response = await api.get('/api/admin/admin-volunteers');
    return response.data;
  },

  getDonations: async () => {
    const response = await api.get('/api/admin/admin-donations');
    return response.data;
  },

  getReports: async () => {
    const response = await api.get('/api/admin/admin-reports');
    return response.data;
  },

  getProfile: async (id) => {
    const response = await api.get(`/api/admin/profile/${id}`);
    return response.data;
  },
};

export default adminService;
