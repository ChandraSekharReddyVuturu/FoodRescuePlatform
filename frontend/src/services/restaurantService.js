import api from './api';

export const restaurantService = {
  registerRestaurant: async (restaurantDTO) => {
    const response = await api.post('/api/restaurants/register', restaurantDTO);
    return response.data;
  },

  getAllRestaurants: async () => {
    const response = await api.get('/api/restaurants');
    return response.data;
  },

  getRestaurantById: async (id) => {
    const response = await api.get(`/api/restaurants/${id}`);
    return response.data;
  },

  updateRestaurant: async (id, restaurantDTO) => {
    const response = await api.put(`/api/restaurants/${id}`, restaurantDTO);
    return response.data;
  },

  deleteRestaurant: async (id) => {
    const response = await api.delete(`/api/restaurants/${id}`);
    return response.data;
  },
};

export default restaurantService;
