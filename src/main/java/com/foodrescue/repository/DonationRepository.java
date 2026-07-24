package com.foodrescue.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.foodrescue.entity.Donation;
import com.foodrescue.entity.Restaurant;
import com.foodrescue.enums.DonationStatus;
import com.foodrescue.enums.FoodType;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    // ======================================================
    // Restaurant
    // ======================================================

    List<Donation> findByRestaurant(Restaurant restaurant);

    List<Donation> findByRestaurantRestaurantId(Long restaurantId);

    List<Donation> findByRestaurantRestaurantIdAndStatus(
            Long restaurantId,
            DonationStatus status);

    // ======================================================
    // NGO
    // ======================================================

    List<Donation> findByNgoNgoId(Long ngoId);

    List<Donation> findByNgoNgoIdAndStatus(
            Long ngoId,
            DonationStatus status);

    // ======================================================
    // Volunteer
    // ======================================================

    List<Donation> findByVolunteerVolunteerId(Long volunteerId);

    List<Donation> findByVolunteerVolunteerIdAndStatus(
            Long volunteerId,
            DonationStatus status);

    // ======================================================
    // Status
    // ======================================================

    List<Donation> findByStatus(DonationStatus status);

    // ======================================================
    // Food Type
    // ======================================================

    List<Donation> findByFoodType(FoodType foodType);

    // ======================================================
    // City
    // ======================================================

    List<Donation> findByRestaurantCity(String city);

    // ======================================================
    // Dashboard Statistics
    // ======================================================

    List<Donation> findTop5ByOrderByCreatedAtDesc();
    
    @Transactional
    void deleteByExpiryTimeBefore(LocalDateTime time);
    
    
    long countByStatus(DonationStatus status);

    long countByRestaurantRestaurantId(Long restaurantId);

    long countByNgoNgoId(Long ngoId);

    long countByVolunteerVolunteerId(Long volunteerId);

    long countByRestaurantRestaurantIdAndStatus(
            Long restaurantId,
            DonationStatus status);

    long countByNgoNgoIdAndStatus(
            Long ngoId,
            DonationStatus status);

    long countByVolunteerVolunteerIdAndStatus(
            Long volunteerId,
            DonationStatus status);
    
    List<Donation> findByRestaurantRestaurantIdAndStatusNot(
            Long restaurantId,
            DonationStatus status);

    List<Donation> findByNgoNgoIdAndStatusNot(
            Long ngoId,
            DonationStatus status);

    List<Donation> findByVolunteerVolunteerIdAndStatusNot(
            Long volunteerId,
            DonationStatus status);

    List<Donation> findByStatusNot(
            DonationStatus status);

    List<Donation> findByFoodTypeAndStatusNot(
            FoodType foodType,
            DonationStatus status);

    List<Donation> findByRestaurantCityAndStatusNot(
            String city,
            DonationStatus status);
    
    
    
}