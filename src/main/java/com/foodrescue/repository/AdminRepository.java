package com.foodrescue.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodrescue.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Find Admin by Email
    Optional<Admin> findByEmail(String email);

    // Find Admin by Admin Name
    Optional<Admin> findByAdminName(String adminName);

    // Check Email Already Exists
    boolean existsByEmail(String email);

}