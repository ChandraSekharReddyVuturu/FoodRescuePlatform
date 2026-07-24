package com.foodrescue.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodrescue.dto.RestaurantDTO;
import com.foodrescue.entity.Restaurant;
import com.foodrescue.entity.User;
import com.foodrescue.exception.ResourceNotFoundException;
import com.foodrescue.exception.UserAlreadyExistsException;
import com.foodrescue.repository.RestaurantRepository;
import com.foodrescue.repository.UserRepository;
import com.foodrescue.service.RestaurantService;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private UserRepository userRepository;

    // Register Restaurant
    @Override
    public RestaurantDTO registerRestaurant(RestaurantDTO restaurantDTO) {

        if (restaurantRepository.existsByPhone(restaurantDTO.getPhone())) {
            throw new UserAlreadyExistsException(
                    "Restaurant already exists with phone : "
                            + restaurantDTO.getPhone());
        }

        if (restaurantRepository.existsByLicenseNumber(
                restaurantDTO.getLicenseNumber())) {

            throw new UserAlreadyExistsException(
                    "License Number already exists : "
                            + restaurantDTO.getLicenseNumber());
        }

        User user = userRepository.findById(restaurantDTO.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Restaurant restaurant = new Restaurant();

        BeanUtils.copyProperties(restaurantDTO, restaurant);

        restaurant.setUser(user);
        restaurant.setStatus("ACTIVE");
        restaurant.setCreatedAt(LocalDateTime.now());

        Restaurant savedRestaurant = restaurantRepository.save(restaurant);

        return convertToDTO(savedRestaurant);
    }

    // Get Restaurant By ID
    @Override
    public RestaurantDTO getRestaurantById(Long restaurantId) {

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant not found with ID : "
                                        + restaurantId));

        return convertToDTO(restaurant);
    }

    // Get All Restaurants
    @Override
    public List<RestaurantDTO> getAllRestaurants() {

        return restaurantRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Update Restaurant
    @Override
    public RestaurantDTO updateRestaurant(Long restaurantId,
                                          RestaurantDTO restaurantDTO) {

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant not found with ID : "
                                        + restaurantId));

        restaurant.setRestaurantName(restaurantDTO.getRestaurantName());
        restaurant.setOwnerName(restaurantDTO.getOwnerName());
        restaurant.setPhone(restaurantDTO.getPhone());
        restaurant.setLicenseNumber(restaurantDTO.getLicenseNumber());
        restaurant.setAddress(restaurantDTO.getAddress());
        restaurant.setCity(restaurantDTO.getCity());
        restaurant.setStatus(restaurantDTO.getStatus());

        Restaurant updatedRestaurant =
                restaurantRepository.save(restaurant);

        return convertToDTO(updatedRestaurant);
    }

    // Delete Restaurant
    @Override
    public void deleteRestaurant(Long restaurantId) {

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant not found with ID : "
                                        + restaurantId));

        restaurantRepository.delete(restaurant);
    }

    // Check Phone Exists
    @Override
    public boolean existsByPhone(String phone) {

        return restaurantRepository.existsByPhone(phone);
    }

    // Check License Exists
    @Override
    public boolean existsByLicenseNumber(String licenseNumber) {

        return restaurantRepository.existsByLicenseNumber(licenseNumber);
    }

    /// Convert Entity To DTO
    private RestaurantDTO convertToDTO(Restaurant restaurant) {

        RestaurantDTO dto = new RestaurantDTO();

        BeanUtils.copyProperties(restaurant, dto);

        if (restaurant.getUser() != null) {

            dto.setUserId(restaurant.getUser().getUserId());

            dto.setEmail(restaurant.getUser().getEmail());

        }

        return dto;
    }
}