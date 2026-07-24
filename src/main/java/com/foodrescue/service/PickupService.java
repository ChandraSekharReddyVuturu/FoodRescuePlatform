package com.foodrescue.service;

import java.util.List;

import com.foodrescue.dto.PickupDTO;

public interface PickupService {

    // Create Pickup
    PickupDTO createPickup(PickupDTO pickupDTO);

    // Get Pickup By Id
    PickupDTO getPickupById(Long pickupId);

    // Get All Pickups
    List<PickupDTO> getAllPickups();

    // Update Pickup
    PickupDTO updatePickup(Long pickupId, PickupDTO pickupDTO);

    // Delete Pickup
    void deletePickup(Long pickupId);

    // Get Pickups By Volunteer
    List<PickupDTO> getPickupsByVolunteer(Long volunteerId);

    // Get Pickups By Restaurant
    List<PickupDTO> getPickupsByRestaurant(Long restaurantId);

    // Get Pickups By NGO
    List<PickupDTO> getPickupsByNGO(Long ngoId);

    // Get Pickups By Status
    List<PickupDTO> getPickupsByStatus(String status);

    // Assign Volunteer
    PickupDTO assignVolunteer(Long pickupId, Long volunteerId);

    // Update Pickup Status
    PickupDTO updatePickupStatus(Long pickupId, String status);

}
