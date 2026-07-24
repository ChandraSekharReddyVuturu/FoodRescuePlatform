import api from './api';

export const volunteerService = {
  registerVolunteer: async (volunteerDTO) => {
    const response = await api.post('/api/volunteers/register', volunteerDTO);
    return response.data;
  },

  getVolunteerByUserId: async (userId) => {
    const response = await api.get(`/api/volunteers/user/${userId}`);
    return response.data;
  },

  getVolunteerById: async (id) => {
    const response = await api.get(`/api/volunteers/${id}`);
    return response.data;
  },

  getAllVolunteers: async () => {
    const response = await api.get('/api/volunteers');
    return response.data;
  },

  updateVolunteer: async (id, volunteerDTO) => {
    const response = await api.put(`/api/volunteers/${id}`, volunteerDTO);
    return response.data;
  },

  deleteVolunteer: async (id) => {
    const response = await api.delete(`/api/volunteers/${id}`);
    return response.data;
  },

  getVolunteersByCity: async (city) => {
    const response = await api.get(`/api/volunteers/city/${city}`);
    return response.data;
  },

  getVolunteersByStatus: async (status) => {
    const response = await api.get(`/api/volunteers/status/${status}`);
    return response.data;
  },

  getVolunteersByAvailability: async (availability) => {
    const response = await api.get(`/api/volunteers/availability/${availability}`);
    return response.data;
  },

  searchVolunteerByName: async (name) => {
    const response = await api.get(`/api/volunteers/search/${name}`);
    return response.data;
  },
};

export default volunteerService;
