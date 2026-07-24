package com.foodrescue.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodrescue.entity.Pickup;

@Repository
public interface PickupRepository extends JpaRepository<Pickup, Long> {

    // Find all pickups assigned to a volunteer
    List<Pickup> findByVolunteerId(Long volunteerId);

    // Find pickup by donation
    List<Pickup> findByDonationId(Long donationId);

    // Find pickups by restaurant
    List<Pickup> findByRestaurantId(Long restaurantId);

    // Find pickups by NGO
    List<Pickup> findByNgoId(Long ngoId);

    // Find pickups by status
    List<Pickup> findByStatus(String status);

    // Find pickups assigned to a volunteer with status
    List<Pickup> findByVolunteerIdAndStatus(Long volunteerId, String status);

    // Find pickups between two dates
    List<Pickup> findByPickupTimeBetween(LocalDateTime startDate,
                                         LocalDateTime endDate);

    // Count pickups by status
    long countByStatus(String status);

}
