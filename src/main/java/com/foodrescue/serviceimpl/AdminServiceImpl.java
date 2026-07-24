package com.foodrescue.serviceimpl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.foodrescue.entity.Admin;
import com.foodrescue.entity.NGO;
import com.foodrescue.entity.Restaurant;
import com.foodrescue.entity.Volunteer;
import com.foodrescue.enums.DonationStatus;
import com.foodrescue.exception.ResourceNotFoundException;
import com.foodrescue.repository.AdminRepository;
import com.foodrescue.repository.DonationRepository;
import com.foodrescue.repository.NGORepository;
import com.foodrescue.repository.PickupRepository;
import com.foodrescue.repository.RestaurantRepository;
import com.foodrescue.repository.UserRepository;
import com.foodrescue.repository.VolunteerRepository;
import com.foodrescue.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RestaurantRepository restaurantRepository;

	@Autowired
	private NGORepository ngoRepository;

	@Autowired
	private VolunteerRepository volunteerRepository;

	@Autowired
	private DonationRepository donationRepository;

	@Autowired
	private PickupRepository pickupRepository;
    
	
	@Override
	public Map<String,Object> getDashboardData(){

	    Map<String,Object> data = new HashMap<>();

	    data.put(
	        "totalUsers",
	        userRepository.count()
	    );

	    data.put(
	        "totalRestaurants",
	        restaurantRepository.count()
	    );

	    data.put(
	        "totalNgos",
	        ngoRepository.count()
	    );

	    data.put(
	        "totalVolunteers",
	        volunteerRepository.count()
	    );

	    data.put(
	        "totalDonations",
	        donationRepository.count()
	    );


	    data.put(
	    	    "completedDeliveries",
	    	    donationRepository.countByStatus(
	    	        DonationStatus.COMPLETED
	    	    )
	    	);


	    return data;
	}
	
    // ===========================
    // Restaurant Management
    // ===========================

    @Override
    public void approveRestaurant(Long restaurantId) {

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant not found with ID : " + restaurantId));

        restaurant.setStatus("APPROVED");

        restaurantRepository.save(restaurant);
    }

    @Override
    public void rejectRestaurant(Long restaurantId) {

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant not found with ID : " + restaurantId));

        restaurant.setStatus("REJECTED");

        restaurantRepository.save(restaurant);
    }

    @Override
    public void blockRestaurant(Long restaurantId) {

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant not found with ID : " + restaurantId));

        restaurant.setStatus("BLOCKED");

        restaurantRepository.save(restaurant);
    }

    @Override
    public void unblockRestaurant(Long restaurantId) {

        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Restaurant not found with ID : " + restaurantId));

        restaurant.setStatus("APPROVED");

        restaurantRepository.save(restaurant);
    }

    // ===========================
    // NGO Management
    // ===========================

    @Override
    public void approveNgo(Long ngoId) {

        NGO ngo = ngoRepository.findById(ngoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "NGO not found with ID : " + ngoId));

        ngo.setStatus("APPROVED");

        ngoRepository.save(ngo);
    }

    @Override
    public void rejectNgo(Long ngoId) {

        NGO ngo = ngoRepository.findById(ngoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "NGO not found with ID : " + ngoId));

        ngo.setStatus("REJECTED");

        ngoRepository.save(ngo);
    }

    @Override
    public void blockNgo(Long ngoId) {

        NGO ngo = ngoRepository.findById(ngoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "NGO not found with ID : " + ngoId));

        ngo.setStatus("BLOCKED");

        ngoRepository.save(ngo);
    }

    @Override
    public void unblockNgo(Long ngoId) {

        NGO ngo = ngoRepository.findById(ngoId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "NGO not found with ID : " + ngoId));

        ngo.setStatus("APPROVED");

        ngoRepository.save(ngo);
    }
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public Admin registerAdmin(Admin admin){

        admin.setPassword(
            passwordEncoder.encode(admin.getPassword())
        );

        admin.setCreatedAt(
            LocalDateTime.now()
        );

        return adminRepository.save(admin);
    }
    @Override
    public void approveVolunteer(Long id) {

        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        volunteer.setStatus("APPROVED");

        volunteerRepository.save(volunteer);
    }

    @Override
    public void rejectVolunteer(Long id) {

        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        volunteer.setStatus("REJECTED");

        volunteerRepository.save(volunteer);
    }

    @Override
    public void blockVolunteer(Long id) {

        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        volunteer.setStatus("BLOCKED");

        volunteerRepository.save(volunteer);
    }

    @Override
    public void unblockVolunteer(Long id) {

        Volunteer volunteer = volunteerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Volunteer not found"));

        volunteer.setStatus("ACTIVE");

        volunteerRepository.save(volunteer);
    }

}