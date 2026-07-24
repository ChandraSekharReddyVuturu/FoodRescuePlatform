package com.foodrescue.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodrescue.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find User by Email
    Optional<User> findByEmail(String email);

    // Find Users by Role
    List<User> findByRole(String role);

    // Find Users by Status
    List<User> findByStatus(String status);

    // Check Email Already Exists
    boolean existsByEmail(String email);
    
    List<User> findTop5ByOrderByCreatedAtDesc();

}