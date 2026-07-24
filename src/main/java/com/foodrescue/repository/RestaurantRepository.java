package com.foodrescue.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodrescue.entity.Restaurant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    // Find restaurant by phone number
    Optional<Restaurant> findByPhone(String phone);

    // Find restaurant by license number
    Optional<Restaurant> findByLicenseNumber(String licenseNumber);

    // Check phone already exists
    boolean existsByPhone(String phone);

    Optional<Restaurant> findByUserUserId(Long userId);
    
    // Check license number already exists
    boolean existsByLicenseNumber(String licenseNumber);

}