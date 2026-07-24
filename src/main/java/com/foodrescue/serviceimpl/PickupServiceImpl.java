package com.foodrescue.serviceimpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodrescue.dto.PickupDTO;
import com.foodrescue.entity.Pickup;
import com.foodrescue.exception.InvalidRequestException;
import com.foodrescue.exception.ResourceNotFoundException;
import com.foodrescue.repository.PickupRepository;
import com.foodrescue.service.PickupService;

@Service
public class PickupServiceImpl implements PickupService {

    @Autowired
    private PickupRepository pickupRepository;

    // Create Pickup
    @Override
    public PickupDTO createPickup(PickupDTO pickupDTO) {

        if (pickupDTO.getVolunteerId() == null) {
            throw new InvalidRequestException("Volunteer ID is required.");
        }

        Pickup pickup = new Pickup();

        BeanUtils.copyProperties(pickupDTO, pickup);

        Pickup savedPickup = pickupRepository.save(pickup);

        return convertToDTO(savedPickup);
    }

    // Get Pickup By ID
    @Override
    public PickupDTO getPickupById(Long pickupId) {

        Pickup pickup = pickupRepository.findById(pickupId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Pickup not found with ID : " + pickupId));

        return convertToDTO(pickup);
    }

    // Get All Pickups
    @Override
    public List<PickupDTO> getAllPickups() {

        return pickupRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Update Pickup
    @Override
    public PickupDTO updatePickup(Long pickupId, PickupDTO pickupDTO) {

        Pickup pickup = pickupRepository.findById(pickupId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Pickup not found with ID : " + pickupId));

        BeanUtils.copyProperties(pickupDTO, pickup);

        pickup.setPickupId(pickupId);

        Pickup updatedPickup = pickupRepository.save(pickup);

        return convertToDTO(updatedPickup);
    }

    // Delete Pickup
    @Override
    public void deletePickup(Long pickupId) {

        Pickup pickup = pickupRepository.findById(pickupId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Pickup not found with ID : " + pickupId));

        pickupRepository.delete(pickup);
    }

    // Get Pickups By Volunteer
    @Override
    public List<PickupDTO> getPickupsByVolunteer(Long volunteerId) {

        return pickupRepository.findByVolunteerId(volunteerId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get Pickups By Restaurant
    @Override
    public List<PickupDTO> getPickupsByRestaurant(Long restaurantId) {

        return pickupRepository.findByRestaurantId(restaurantId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get Pickups By NGO
    @Override
    public List<PickupDTO> getPickupsByNGO(Long ngoId) {

        return pickupRepository.findByNgoId(ngoId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get Pickups By Status
    @Override
    public List<PickupDTO> getPickupsByStatus(String status) {

        return pickupRepository.findByStatus(status)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Assign Volunteer
    @Override
    public PickupDTO assignVolunteer(Long pickupId, Long volunteerId) {

        Pickup pickup = pickupRepository.findById(pickupId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Pickup not found with ID : " + pickupId));

        if (pickup.getVolunteerId() != null && pickup.getVolunteerId() != 0) {
            throw new InvalidRequestException("Volunteer already assigned.");
        }

        pickup.setVolunteerId(volunteerId);
        pickup.setStatus("ASSIGNED");

        Pickup updatedPickup = pickupRepository.save(pickup);

        return convertToDTO(updatedPickup);
    }

    // Update Pickup Status
    @Override
    public PickupDTO updatePickupStatus(Long pickupId, String status) {

        Pickup pickup = pickupRepository.findById(pickupId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Pickup not found with ID : " + pickupId));

        pickup.setStatus(status);

        Pickup updatedPickup = pickupRepository.save(pickup);

        return convertToDTO(updatedPickup);
    }

    // Convert Entity to DTO
    private PickupDTO convertToDTO(Pickup pickup) {

        PickupDTO dto = new PickupDTO();

        BeanUtils.copyProperties(pickup, dto);

        return dto;
    }
}