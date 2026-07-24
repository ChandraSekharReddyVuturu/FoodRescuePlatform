package com.foodrescue.service;

import java.util.List;

import com.foodrescue.entity.User;

public interface UserService {

    /**
     * Get all users
     *
     * @return List<User>
     */
    List<User> getAllUsers();

    /**
     * Get user by ID
     *
     * @param userId
     * @return User
     */
    User getUserById(Long userId);

    /**
     * Get user by Email
     *
     * @param email
     * @return User
     */
    User getUserByEmail(String email);

    /**
     * Get users by Role
     *
     * @param role
     * @return List<User>
     */
    List<User> getUsersByRole(String role);

    /**
     * Update User
     *
     * @param userId
     * @param user
     * @return User
     */
    User updateUser(Long userId, User user);

    /**
     * Delete User
     *
     * @param userId
     */
    void deleteUser(Long userId);

}