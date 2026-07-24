package com.foodrescue.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodrescue.entity.NGO;

@Repository
public interface NGORepository extends JpaRepository<NGO, Long> {

    // Find NGO by NGO Name
    Optional<NGO> findByNgoName(String ngoName);

    Optional<NGO> findByUserUserId(Long userId);

    // Check Phone Exists
    boolean existsByPhone(String phone);

    // Check Registration Number Exists
    boolean existsByRegistrationNumber(String registrationNumber);

    // Find NGOs by City
    List<NGO> findByCity(String city);

    // Find NGOs by Status
    List<NGO> findByStatus(String status);

}