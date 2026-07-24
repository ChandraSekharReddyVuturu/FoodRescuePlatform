package com.foodrescue.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodrescue.dto.FoodRequestDTO;
import com.foodrescue.entity.Donation;
import com.foodrescue.entity.FoodRequest;
import com.foodrescue.entity.NGO;
import com.foodrescue.exception.ResourceNotFoundException;
import com.foodrescue.repository.DonationRepository;
import com.foodrescue.repository.FoodRequestRepository;
import com.foodrescue.repository.NGORepository;
import com.foodrescue.service.FoodRequestService;

@Service
public class FoodRequestServiceImpl implements FoodRequestService {

    @Autowired
    private FoodRequestRepository foodRequestRepository;

    @Autowired
    private NGORepository ngoRepository;

    @Autowired
    private DonationRepository donationRepository;

    // Create Food Request
    @Override
    public FoodRequestDTO createRequest(FoodRequestDTO dto) {

        NGO ngo = ngoRepository.findById(dto.getNgoId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "NGO not found with ID : " + dto.getNgoId()));

        Donation donation = donationRepository.findById(dto.getDonationId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Donation not found with ID : " + dto.getDonationId()));

        FoodRequest request = new FoodRequest();

        request.setNgo(ngo);
        request.setDonation(donation);
        request.setRequestStatus("PENDING");
        request.setRequestDate(LocalDateTime.now());
        request.setRemarks(dto.getRemarks());

        FoodRequest saved = foodRequestRepository.save(request);

        return convertToDTO(saved);
    }

    // Update Request Status
    @Override
    public FoodRequestDTO updateRequestStatus(Long requestId, String status) {

        FoodRequest request = foodRequestRepository.findById(requestId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Food Request not found with ID : " + requestId));

        request.setRequestStatus(status);

        FoodRequest updated = foodRequestRepository.save(request);

        return convertToDTO(updated);
    }

    // Delete Request
    @Override
    public void deleteRequest(Long requestId) {

        FoodRequest request = foodRequestRepository.findById(requestId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Food Request not found with ID : " + requestId));

        foodRequestRepository.delete(request);
    }

    // Get Request By ID
    @Override
    public FoodRequestDTO getRequestById(Long requestId) {

        FoodRequest request = foodRequestRepository.findById(requestId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Food Request not found with ID : " + requestId));

        return convertToDTO(request);
    }

    // Get All Requests
    @Override
    public List<FoodRequestDTO> getAllRequests() {

        return foodRequestRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get Requests By NGO
    @Override
    public List<FoodRequestDTO> getRequestsByNGO(Long ngoId) {

        return foodRequestRepository.findByNgoNgoId(ngoId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get Requests By Status
    @Override
    public List<FoodRequestDTO> getRequestsByStatus(String status) {

        return foodRequestRepository.findByRequestStatus(status)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get Requests By Donation
    @Override
    public List<FoodRequestDTO> getRequestsByDonation(Long donationId) {

        return foodRequestRepository.findByDonationDonationId(donationId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<FoodRequestDTO> getReceivedFood(Long ngoId) {

        return foodRequestRepository
                .findByNgoNgoIdAndRequestStatus(
                        ngoId,
                        "COMPLETED")
                .stream()
                .map(this::convertToDTO)
                .toList();

    }
    
    @Override
    public List<FoodRequestDTO> getRequestsByRestaurant(Long restaurantId) {

        return foodRequestRepository
                .findByDonation_Restaurant_RestaurantId(restaurantId)
                .stream()
                .map(this::convertToDTO)
                .toList();

    }
    
    // Entity -> DTO
    private FoodRequestDTO convertToDTO(FoodRequest request) {

        FoodRequestDTO dto = new FoodRequestDTO();

        dto.setRequestId(request.getRequestId());
        dto.setNgoId(request.getNgo().getNgoId());
        dto.setDonationId(request.getDonation().getDonationId());
        dto.setRequestStatus(request.getRequestStatus());
        dto.setRequestDate(request.getRequestDate());
        dto.setRemarks(request.getRemarks());
        dto.setRestaurantName(
        	    request.getDonation()
        	           .getRestaurant()
        	           .getRestaurantName());

        	dto.setFoodName(
        	    request.getDonation()
        	           .getFoodName());

        	dto.setRequiredMeals(
        	    request.getDonation()
        	           .getQuantity());
        return dto;
    }

}