import api from './api';

export const donationService = {
  addDonation: async (dto) => {
    const response = await api.post('/api/donations', dto);
    return response.data;
  },

  getDonationById: async (donationId) => {
    const response = await api.get(`/api/donations/${donationId}`);
    return response.data;
  },

  updateDonation: async (donationId, dto) => {
    const response = await api.put(`/api/donations/${donationId}`, dto);
    return response.data;
  },

  deleteDonation: async (donationId) => {
    const response = await api.delete(`/api/donations/${donationId}`);
    return response.data;
  },

  getRestaurantDonations: async (restaurantId) => {
    const response = await api.get(`/api/donations/restaurant/${restaurantId}`);
    return response.data;
  },

  getRestaurantDonationsByStatus: async (restaurantId, status) => {
    const response = await api.get(`/api/donations/restaurant/${restaurantId}/${status}`);
    return response.data;
  },

  getAvailableDonations: async () => {
    const response = await api.get('/api/donations/available');
    return response.data;
  },

  acceptDonation: async (donationId, ngoId) => {
    const response = await api.put(`/api/donations/${donationId}/accept/${ngoId}`);
    return response.data;
  },

  getNGODonations: async (ngoId) => {
    const response = await api.get(`/api/donations/ngo/${ngoId}`);
    return response.data;
  },

  getNGODonationsByStatus: async (ngoId, status) => {
    const response = await api.get(`/api/donations/ngo/${ngoId}/${status}`);
    return response.data;
  },

  assignVolunteer: async (donationId, volunteerId) => {
    const response = await api.put(`/api/donations/${donationId}/assign/${volunteerId}`);
    return response.data;
  },

  pickupDonation: async (donationId) => {
    const response = await api.put(`/api/donations/${donationId}/pickup`);
    return response.data;
  },

  deliverDonation: async (donationId) => {
    const response = await api.put(`/api/donations/${donationId}/deliver`);
    return response.data;
  },

  completeDonation: async (donationId) => {
    const response = await api.put(`/api/donations/${donationId}/complete`);
    return response.data;
  },

  getVolunteerDonations: async (volunteerId) => {
    const response = await api.get(`/api/donations/volunteer/${volunteerId}`);
    return response.data;
  },

  getAllDonations: async () => {
    const response = await api.get('/api/donations/admin/all');
    return response.data;
  },
};

export const foodRequestService = {
  createRequest: async (requestDTO) => {
    const response = await api.post('/api/foodrequests', requestDTO);
    return response.data;
  },

  getAllRequests: async () => {
    const response = await api.get('/api/foodrequests');
    return response.data;
  },

  getRequestById: async (id) => {
    const response = await api.get(`/api/foodrequests/${id}`);
    return response.data;
  },

  deleteRequest: async (id) => {
    const response = await api.delete(`/api/foodrequests/${id}`);
    return response.data;
  },

  updateRequestStatus: async (id, status) => {
    const response = await api.put(`/api/foodrequests/${id}/${status}`);
    return response.data;
  },

  getRequestsByNGO: async (ngoId) => {
    const response = await api.get(`/api/foodrequests/ngo/${ngoId}`);
    return response.data;
  },

  getReceivedFood: async (ngoId) => {
    const response = await api.get(`/api/foodrequests/received/${ngoId}`);
    return response.data;
  },

  getRequestsByRestaurant: async (restaurantId) => {
    const response = await api.get(`/api/foodrequests/restaurant/${restaurantId}`);
    return response.data;
  },
};

export const pickupService = {
  createPickup: async (pickupDTO) => {
    const response = await api.post('/api/pickups', pickupDTO);
    return response.data;
  },

  getAllPickups: async () => {
    const response = await api.get('/api/pickups');
    return response.data;
  },

  getPickupsByVolunteer: async (volunteerId) => {
    const response = await api.get(`/api/pickups/volunteer/${volunteerId}`);
    return response.data;
  },

  getPickupsByRestaurant: async (restaurantId) => {
    const response = await api.get(`/api/pickups/restaurant/${restaurantId}`);
    return response.data;
  },

  getPickupsByNGO: async (ngoId) => {
    const response = await api.get(`/api/pickups/ngo/${ngoId}`);
    return response.data;
  },

  assignVolunteer: async (pickupId, volunteerId) => {
    const response = await api.put(`/api/pickups/${pickupId}/assign/${volunteerId}`);
    return response.data;
  },

  updatePickupStatus: async (pickupId, status) => {
    const response = await api.put(`/api/pickups/${pickupId}/status?status=${status}`);
    return response.data;
  },
};

export default donationService;
