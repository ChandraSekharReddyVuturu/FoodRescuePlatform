package com.foodrescue.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodrescue.entity.Volunteer;


@Repository
public interface VolunteerRepository 
        extends JpaRepository<Volunteer, Long> {



    // Find volunteer profile using logged-in user

    Optional<Volunteer> findByUserUserId(Long userId);



    // Check volunteer profile already exists

    boolean existsByUserUserId(Long userId);



    // Find volunteers by city

    List<Volunteer> findByCity(String city);



    // Find volunteers by status

    List<Volunteer> findByStatus(String status);



    // Find available volunteers

    List<Volunteer> findByAvailability(String availability);



    // Search by name

    List<Volunteer> findByFullNameContainingIgnoreCase(
            String fullName
    );

}