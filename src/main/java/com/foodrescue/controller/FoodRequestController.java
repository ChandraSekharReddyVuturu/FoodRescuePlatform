package com.foodrescue.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodrescue.dto.FoodRequestDTO;
import com.foodrescue.service.FoodRequestService;

@RestController
@RequestMapping("/api/foodrequests")
@CrossOrigin(origins = "*")
public class FoodRequestController {

    @Autowired
    private FoodRequestService foodRequestService;

    // Create Food Request
    @PostMapping
    public ResponseEntity<FoodRequestDTO> createRequest(
            @RequestBody FoodRequestDTO requestDTO) {

        FoodRequestDTO savedRequest =
                foodRequestService.createRequest(requestDTO);

        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }

    // Get All Requests
    @GetMapping
    public ResponseEntity<List<FoodRequestDTO>> getAllRequests() {

        return ResponseEntity.ok(
                foodRequestService.getAllRequests());
    }

    // Get Request By ID
    @GetMapping("/{id}")
    public ResponseEntity<FoodRequestDTO> getRequestById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                foodRequestService.getRequestById(id));
    }

    // Delete Request
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRequest(
            @PathVariable Long id) {

        foodRequestService.deleteRequest(id);

        return ResponseEntity.ok(
                "Request Deleted Successfully");
    }

    // Update Request Status
    @PutMapping("/{id}/{status}")
    public ResponseEntity<FoodRequestDTO> updateRequestStatus(
            @PathVariable Long id,
            @PathVariable String status) {

        return ResponseEntity.ok(
                foodRequestService.updateRequestStatus(id, status));
    }

    // Get Requests By NGO
    @GetMapping("/ngo/{ngoId}")
    public ResponseEntity<List<FoodRequestDTO>> getRequestsByNGO(
            @PathVariable Long ngoId) {

        return ResponseEntity.ok(
                foodRequestService.getRequestsByNGO(ngoId));
    }

    // Get Requests By Status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<FoodRequestDTO>> getRequestsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                foodRequestService.getRequestsByStatus(status));
    }

    // Get Requests By Donation
    @GetMapping("/donation/{donationId}")
    public ResponseEntity<List<FoodRequestDTO>> getRequestsByDonation(
            @PathVariable Long donationId) {

        return ResponseEntity.ok(
                foodRequestService.getRequestsByDonation(donationId));
    }
    
    @GetMapping("/received/{ngoId}")
    public ResponseEntity<List<FoodRequestDTO>> getReceivedFood(
            @PathVariable Long ngoId) {

        return ResponseEntity.ok(
                foodRequestService.getReceivedFood(ngoId));

    }
    
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<FoodRequestDTO>> getRequestsByRestaurant(
            @PathVariable Long restaurantId) {

        return ResponseEntity.ok(
                foodRequestService.getRequestsByRestaurant(restaurantId));
    }

}