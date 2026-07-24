import api from './api';

export const ngoService = {
  registerNGO: async (registerDTO) => {
    const response = await api.post('/api/ngos/register', registerDTO);
    return response.data;
  },

  getNGOProfile: async (ngoId) => {
    const response = await api.get(`/api/ngos/${ngoId}`);
    return response.data;
  },

  updateNGO: async (ngoId, ngoData) => {
    const response = await api.put(`/api/ngos/${ngoId}`, ngoData);
    return response.data;
  },
};

export default ngoService;
