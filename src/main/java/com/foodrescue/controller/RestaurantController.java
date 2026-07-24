package com.foodrescue.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodrescue.dto.RestaurantDTO;
import com.foodrescue.service.RestaurantService;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = "*")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    // Register Restaurant
    @PostMapping("/register")
    public ResponseEntity<RestaurantDTO> registerRestaurant(@RequestBody RestaurantDTO restaurantDTO) {

        RestaurantDTO savedRestaurant = restaurantService.registerRestaurant(restaurantDTO);

        return new ResponseEntity<>(savedRestaurant, HttpStatus.CREATED);
    }

    // Get All Restaurants
    @GetMapping
    public ResponseEntity<List<RestaurantDTO>> getAllRestaurants() {

        List<RestaurantDTO> restaurants = restaurantService.getAllRestaurants();

        return ResponseEntity.ok(restaurants);
    }

    // Get Restaurant By ID
    @GetMapping("/{id}")
    public ResponseEntity<RestaurantDTO> getRestaurantById(@PathVariable Long id) {

        RestaurantDTO restaurant = restaurantService.getRestaurantById(id);

        return ResponseEntity.ok(restaurant);
    }

    // Update Restaurant
    @PutMapping("/{id}")
    public ResponseEntity<RestaurantDTO> updateRestaurant(
            @PathVariable Long id,
            @RequestBody RestaurantDTO restaurantDTO) {

        RestaurantDTO updatedRestaurant =
                restaurantService.updateRestaurant(id, restaurantDTO);

        return ResponseEntity.ok(updatedRestaurant);
    }

    // Delete Restaurant
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable Long id) {

        restaurantService.deleteRestaurant(id);

        return ResponseEntity.ok("Restaurant Deleted Successfully");
    }

}
