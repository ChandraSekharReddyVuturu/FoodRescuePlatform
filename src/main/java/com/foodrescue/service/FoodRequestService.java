package com.foodrescue.service;

import java.util.List;

import com.foodrescue.dto.FoodRequestDTO;

public interface FoodRequestService {

    // Create Food Request
    FoodRequestDTO createRequest(FoodRequestDTO requestDTO);

    // Update Request Status
    FoodRequestDTO updateRequestStatus(Long requestId, String status);

    // Delete Request
    void deleteRequest(Long requestId);

    // Get Request By ID
    FoodRequestDTO getRequestById(Long requestId);

    // Get All Requests
    List<FoodRequestDTO> getAllRequests();

    // Get Requests By NGO
    List<FoodRequestDTO> getRequestsByNGO(Long ngoId);

    // Get Requests By Status
    List<FoodRequestDTO> getRequestsByStatus(String status);

    // Get Requests By Donation
    List<FoodRequestDTO> getRequestsByDonation(Long donationId);

    // ⭐ Get Received Food
    List<FoodRequestDTO> getReceivedFood(Long ngoId);
    
    List<FoodRequestDTO> getRequestsByRestaurant(Long restaurantId);

}