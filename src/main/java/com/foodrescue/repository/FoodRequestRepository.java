package com.foodrescue.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodrescue.entity.FoodRequest;

@Repository
public interface FoodRequestRepository extends JpaRepository<FoodRequest, Long> {

    // Get all requests by NGO
    List<FoodRequest> findByNgoNgoId(Long ngoId);

    // Get requests by status
    List<FoodRequest> findByRequestStatus(String requestStatus);

    // Get requests by donation
    List<FoodRequest> findByDonationDonationId(Long donationId);

    // ⭐ Received Food
    List<FoodRequest> findByNgoNgoIdAndRequestStatus(
            Long ngoId,
            String requestStatus);
    
    List<FoodRequest> findByDonation_Restaurant_RestaurantId(Long restaurantId);

}