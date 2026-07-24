package com.foodrescue.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodrescue.dto.DonationDTO;
import com.foodrescue.entity.Donation;
import com.foodrescue.entity.NGO;
import com.foodrescue.entity.Restaurant;
import com.foodrescue.entity.Volunteer;
import com.foodrescue.enums.DonationStatus;
import com.foodrescue.enums.FoodType;
import com.foodrescue.exception.InvalidRequestException;
import com.foodrescue.repository.DonationRepository;
import com.foodrescue.repository.NGORepository;
import com.foodrescue.repository.RestaurantRepository;
import com.foodrescue.repository.VolunteerRepository;
import com.foodrescue.service.DonationService;

@Service
public class DonationServiceImpl implements DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private NGORepository ngoRepository;

    @Autowired
    private VolunteerRepository volunteerRepository;

    // ======================================================
    // Add Donation
    // ======================================================

    @Override
    public DonationDTO addDonation(DonationDTO dto) {

        Restaurant restaurant = restaurantRepository.findById(dto.getRestaurantId())
                .orElseThrow(() ->
                        new InvalidRequestException("Restaurant not found."));

        Donation donation = new Donation();

        donation.setFoodName(dto.getFoodName());
        donation.setFoodType(dto.getFoodType());
        donation.setQuantity(dto.getQuantity());
        donation.setApproxMeals(dto.getApproxMeals());
        donation.setPreparedTime(dto.getPreparedTime());
        donation.setExpiryTime(dto.getExpiryTime());
        donation.setPickupAddress(dto.getPickupAddress());
        donation.setFoodImage(dto.getFoodImage());
        donation.setSpecialInstructions(dto.getSpecialInstructions());

        donation.setRestaurant(restaurant);
        donation.setStatus(DonationStatus.AVAILABLE);
        donation.setCreatedAt(LocalDateTime.now());

        Donation saved = donationRepository.save(donation);

        return convertToDTO(saved);
    }

    // ======================================================
    // Update Donation
    // ======================================================

    @Override
    public DonationDTO updateDonation(Long donationId,
                                      DonationDTO dto) {

        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() ->
                        new InvalidRequestException("Donation not found."));

        donation.setFoodName(dto.getFoodName());
        donation.setFoodType(dto.getFoodType());
        donation.setQuantity(dto.getQuantity());
        donation.setApproxMeals(dto.getApproxMeals());
        donation.setPreparedTime(dto.getPreparedTime());
        donation.setExpiryTime(dto.getExpiryTime());
        donation.setPickupAddress(dto.getPickupAddress());
        donation.setFoodImage(dto.getFoodImage());
        donation.setSpecialInstructions(dto.getSpecialInstructions());

        Donation updated = donationRepository.save(donation);

        return convertToDTO(updated);
    }

    // ======================================================
    // Delete Donation
    // ======================================================

    @Override
    public void deleteDonation(Long donationId) {

        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() ->
                        new InvalidRequestException("Donation not found."));

        donationRepository.delete(donation);
    }

    // ======================================================
    // Get Donation By ID
    // ======================================================

    @Override
    public DonationDTO getDonationById(Long donationId) {

        updateExpiredDonations();

        Donation donation = donationRepository.findById(donationId)
                .orElseThrow(() ->
                        new InvalidRequestException("Donation not found."));

        if (donation.getStatus() == DonationStatus.EXPIRED) {
            throw new InvalidRequestException("Donation not found.");
        }

        return convertToDTO(donation);
    }

    // ======================================================
    // Restaurant Module
    // ======================================================

    @Override
    public List<DonationDTO> getDonationsByRestaurant(Long restaurantId) {

        updateExpiredDonations();

        return donationRepository
                .findByRestaurantRestaurantIdAndStatusNot(
                        restaurantId,
                        DonationStatus.EXPIRED)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public List<DonationDTO> getRestaurantDonationsByStatus(
            Long restaurantId,
            DonationStatus status) {

        updateExpiredDonations();

        if (status == DonationStatus.EXPIRED) {
            return List.of();
        }

        return donationRepository
                .findByRestaurantRestaurantIdAndStatus(
                        restaurantId,
                        status)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }
 // ======================================================
 // NGO MODULE
 // ======================================================

 @Override
 public List<DonationDTO> getAvailableDonations() {

     updateExpiredDonations();

     return donationRepository
             .findByStatus(DonationStatus.AVAILABLE)
             .stream()
             .map(this::convertToDTO)
             .toList();
 }

 @Override
 public DonationDTO acceptDonation(
         Long donationId,
         Long ngoId) {

     updateExpiredDonations();

     Donation donation = donationRepository.findById(donationId)
             .orElseThrow(() ->
                     new InvalidRequestException(
                             "Donation not found."));

     NGO ngo = ngoRepository.findById(ngoId)
             .orElseThrow(() ->
                     new InvalidRequestException(
                             "NGO not found."));

     if (donation.getStatus() == DonationStatus.EXPIRED) {
         throw new InvalidRequestException(
                 "Donation has expired.");
     }

     if (donation.getExpiryTime() != null
             && donation.getExpiryTime().isBefore(LocalDateTime.now())) {

         donation.setStatus(DonationStatus.EXPIRED);

         donationRepository.save(donation);

         throw new InvalidRequestException(
                 "Donation has expired.");
     }

     if (donation.getStatus() != DonationStatus.AVAILABLE) {

         throw new InvalidRequestException(
                 "Donation is not available.");
     }

     donation.setNgo(ngo);

     donation.setStatus(DonationStatus.ACCEPTED);

     donation.setAcceptedAt(LocalDateTime.now());

     Donation updated = donationRepository.save(donation);

     return convertToDTO(updated);
 }

 @Override
 public List<DonationDTO> getDonationsByNGO(Long ngoId) {

     updateExpiredDonations();

     return donationRepository
             .findByNgoNgoIdAndStatusNot(
                     ngoId,
                     DonationStatus.EXPIRED)
             .stream()
             .map(this::convertToDTO)
             .toList();
 }

 @Override
 public List<DonationDTO> getNGODonationsByStatus(
         Long ngoId,
         DonationStatus status) {

     updateExpiredDonations();

     if (status == DonationStatus.EXPIRED) {
         return List.of();
     }

     return donationRepository
             .findByNgoNgoIdAndStatus(
                     ngoId,
                     status)
             .stream()
             .map(this::convertToDTO)
             .toList();
 }
//======================================================
//VOLUNTEER MODULE
//======================================================

@Override
public DonationDTO assignVolunteer(
      Long donationId,
      Long volunteerId) {

  updateExpiredDonations();

  Donation donation = donationRepository.findById(donationId)
          .orElseThrow(() ->
                  new InvalidRequestException(
                          "Donation not found."));

  Volunteer volunteer = volunteerRepository.findById(volunteerId)
          .orElseThrow(() ->
                  new InvalidRequestException(
                          "Volunteer not found."));

  if (donation.getStatus() == DonationStatus.EXPIRED) {

      throw new InvalidRequestException(
              "Donation has expired.");
  }

  if (donation.getStatus() != DonationStatus.ACCEPTED) {

      throw new InvalidRequestException(
              "Donation is not accepted by NGO.");
  }

  donation.setVolunteer(volunteer);

  donation.setStatus(DonationStatus.ASSIGNED);

  Donation updated = donationRepository.save(donation);

  return convertToDTO(updated);
}

@Override
public DonationDTO pickupDonation(
      Long donationId) {

  updateExpiredDonations();

  Donation donation = donationRepository.findById(donationId)
          .orElseThrow(() ->
                  new InvalidRequestException(
                          "Donation not found."));

  if (donation.getStatus() == DonationStatus.EXPIRED) {

      throw new InvalidRequestException(
              "Donation has expired.");
  }

  if (donation.getStatus() != DonationStatus.ASSIGNED) {

      throw new InvalidRequestException(
              "Volunteer is not assigned.");
  }

  donation.setStatus(DonationStatus.PICKED_UP);

  donation.setPickedUpAt(LocalDateTime.now());

  Donation updated = donationRepository.save(donation);

  return convertToDTO(updated);
}

@Override
public DonationDTO deliverDonation(
      Long donationId) {

  updateExpiredDonations();

  Donation donation = donationRepository.findById(donationId)
          .orElseThrow(() ->
                  new InvalidRequestException(
                          "Donation not found."));

  if (donation.getStatus() == DonationStatus.EXPIRED) {

      throw new InvalidRequestException(
              "Donation has expired.");
  }

  if (donation.getStatus() != DonationStatus.PICKED_UP) {

      throw new InvalidRequestException(
              "Donation is not picked up.");
  }

  donation.setStatus(DonationStatus.DELIVERED);

  donation.setDeliveredAt(LocalDateTime.now());

  Donation updated = donationRepository.save(donation);

  return convertToDTO(updated);
}

@Override
public DonationDTO completeDonation(
      Long donationId) {

  updateExpiredDonations();

  Donation donation = donationRepository.findById(donationId)
          .orElseThrow(() ->
                  new InvalidRequestException(
                          "Donation not found."));

  if (donation.getStatus() == DonationStatus.EXPIRED) {

      throw new InvalidRequestException(
              "Donation has expired.");
  }

  if (donation.getStatus() != DonationStatus.DELIVERED) {

      throw new InvalidRequestException(
              "Donation is not delivered.");
  }

  donation.setStatus(DonationStatus.COMPLETED);

  donation.setCompletedAt(LocalDateTime.now());

  Donation updated = donationRepository.save(donation);

  return convertToDTO(updated);
}

@Override
public List<DonationDTO> getDonationsByVolunteer(
      Long volunteerId) {

  updateExpiredDonations();

  return donationRepository
          .findByVolunteerVolunteerIdAndStatusNot(
                  volunteerId,
                  DonationStatus.EXPIRED)
          .stream()
          .map(this::convertToDTO)
          .toList();
}

@Override
public List<DonationDTO> getVolunteerDonationsByStatus(
      Long volunteerId,
      DonationStatus status) {

  updateExpiredDonations();

  if (status == DonationStatus.EXPIRED) {
      return List.of();
  }

  return donationRepository
          .findByVolunteerVolunteerIdAndStatus(
                  volunteerId,
                  status)
          .stream()
          .map(this::convertToDTO)
          .toList();
}
//======================================================
//ADMIN MODULE
//======================================================

@Override
public List<DonationDTO> getAllDonations() {

 updateExpiredDonations();

 return donationRepository
         .findByStatusNot(DonationStatus.EXPIRED)
         .stream()
         .map(this::convertToDTO)
         .toList();
}

@Override
public List<DonationDTO> getDonationsByStatus(
     DonationStatus status) {

 updateExpiredDonations();

 if (status == DonationStatus.EXPIRED) {
     return List.of();
 }

 return donationRepository
         .findByStatus(status)
         .stream()
         .map(this::convertToDTO)
         .toList();
}

@Override
public List<DonationDTO> getDonationsByFoodType(
     FoodType foodType) {

 updateExpiredDonations();

 return donationRepository
         .findByFoodTypeAndStatusNot(
                 foodType,
                 DonationStatus.EXPIRED)
         .stream()
         .map(this::convertToDTO)
         .toList();
}

@Override
public List<DonationDTO> getDonationsByCity(
     String city) {

 updateExpiredDonations();

 return donationRepository
         .findByRestaurantCityAndStatusNot(
                 city,
                 DonationStatus.EXPIRED)
         .stream()
         .map(this::convertToDTO)
         .toList();
}

//======================================================
//Auto Expire Donations
//======================================================

private void updateExpiredDonations() {

 List<Donation> donations = donationRepository.findAll();

 LocalDateTime now = LocalDateTime.now();

 for (Donation donation : donations) {

     if (donation.getStatus() == DonationStatus.AVAILABLE
             && donation.getExpiryTime() != null
             && donation.getExpiryTime().isBefore(now)) {

         donation.setStatus(DonationStatus.EXPIRED);

         donationRepository.save(donation);
     }
 }
}

//======================================================
//DTO CONVERSION
//======================================================

private DonationDTO convertToDTO(Donation donation) {

 DonationDTO dto = new DonationDTO();

 dto.setDonationId(donation.getDonationId());
 dto.setFoodName(donation.getFoodName());
 dto.setFoodType(donation.getFoodType());
 dto.setQuantity(donation.getQuantity());
 dto.setApproxMeals(donation.getApproxMeals());
 dto.setPreparedTime(donation.getPreparedTime());
 dto.setExpiryTime(donation.getExpiryTime());
 dto.setPickupAddress(donation.getPickupAddress());
 dto.setFoodImage(donation.getFoodImage());
 dto.setSpecialInstructions(donation.getSpecialInstructions());
 dto.setStatus(donation.getStatus());
 dto.setCreatedAt(donation.getCreatedAt());

 // Restaurant
 if (donation.getRestaurant() != null) {

     dto.setRestaurantId(
             donation.getRestaurant().getRestaurantId());

     dto.setRestaurantName(
             donation.getRestaurant().getRestaurantName());
 }

 // NGO
 if (donation.getNgo() != null) {

     dto.setNgoId(
             donation.getNgo().getNgoId());

     dto.setNgoName(
             donation.getNgo().getNgoName());
 }

 // Volunteer
 if (donation.getVolunteer() != null) {

     dto.setVolunteerId(
             donation.getVolunteer().getVolunteerId());

     dto.setVolunteerName(
             donation.getVolunteer().getFullName());
 }

 dto.setAcceptedAt(donation.getAcceptedAt());
 dto.setPickedUpAt(donation.getPickedUpAt());
 dto.setDeliveredAt(donation.getDeliveredAt());
 dto.setCompletedAt(donation.getCompletedAt());

 return dto;
}
}