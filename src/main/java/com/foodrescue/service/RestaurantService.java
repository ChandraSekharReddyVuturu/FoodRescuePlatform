package com.foodrescue.service;

import java.util.List;

import com.foodrescue.dto.RestaurantDTO;

public interface RestaurantService {

    /**
     * Register a new restaurant
     *
     * @param restaurantDTO
     * @return RestaurantDTO
     */
    RestaurantDTO registerRestaurant(RestaurantDTO restaurantDTO);

    /**
     * Get all restaurants
     *
     * @return List<RestaurantDTO>
     */
    List<RestaurantDTO> getAllRestaurants();

    /**
     * Get restaurant by ID
     *
     * @param restaurantId
     * @return RestaurantDTO
     */
    RestaurantDTO getRestaurantById(Long restaurantId);

    /**
     * Update restaurant details
     *
     * @param restaurantId
     * @param restaurantDTO
     * @return RestaurantDTO
     */
    RestaurantDTO updateRestaurant(Long restaurantId,
                                   RestaurantDTO restaurantDTO);

    /**
     * Delete restaurant
     *
     * @param restaurantId
     */
    void deleteRestaurant(Long restaurantId);

    /**
     * Get restaurant by email
     *
     * @param email
     * @return RestaurantDTO
     */
    boolean existsByPhone(String phone);

    /**
     * Check whether license already exists
     *
     * @param licenseNumber
     * @return boolean
     */
    boolean existsByLicenseNumber(String licenseNumber);

}
