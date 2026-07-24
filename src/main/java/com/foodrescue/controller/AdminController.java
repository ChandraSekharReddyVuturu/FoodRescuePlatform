package com.foodrescue.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodrescue.dto.AdminNgoDTO;
import com.foodrescue.dto.AdminProfileDTO;
import com.foodrescue.dto.AdminReportDTO;
import com.foodrescue.repository.NGORepository;
import com.foodrescue.dto.AdminDonationDTO;
import com.foodrescue.dto.AdminRestaurantDTO;
import com.foodrescue.dto.AdminVolunteerDTO;
import com.foodrescue.entity.Admin;
import com.foodrescue.entity.Donation;
import com.foodrescue.enums.DonationStatus;
import com.foodrescue.repository.AdminRepository;
import com.foodrescue.repository.DonationRepository;
import com.foodrescue.repository.RestaurantRepository;
import com.foodrescue.repository.UserRepository;
import com.foodrescue.repository.VolunteerRepository;
import com.foodrescue.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

	@Autowired
	private VolunteerRepository volunteerRepository;
	
	@Autowired
	private RestaurantRepository restaurantRepository;
	
	@Autowired
	private DonationRepository donationRepository;
	
    @Autowired
    private AdminService adminService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private NGORepository ngoRepository;
    
    @Autowired
    private AdminRepository adminRepository;

    // ==========================
    // Restaurant Management
    // ==========================

    // Approve Restaurant
    @PutMapping("/restaurants/{id}/approve")
    public ResponseEntity<String> approveRestaurant(
            @PathVariable Long id) {

        adminService.approveRestaurant(id);

        return ResponseEntity.ok("Restaurant Approved Successfully");
    }

    // Reject Restaurant
    @PutMapping("/restaurants/{id}/reject")
    public ResponseEntity<String> rejectRestaurant(
            @PathVariable Long id) {

        adminService.rejectRestaurant(id);

        return ResponseEntity.ok("Restaurant Rejected Successfully");
    }

    // Block Restaurant
    @PutMapping("/restaurants/{id}/block")
    public ResponseEntity<String> blockRestaurant(
            @PathVariable Long id) {

        adminService.blockRestaurant(id);

        return ResponseEntity.ok("Restaurant Blocked Successfully");
    }

    // Unblock Restaurant
    @PutMapping("/restaurants/{id}/unblock")
    public ResponseEntity<String> unblockRestaurant(
            @PathVariable Long id) {

        adminService.unblockRestaurant(id);

        return ResponseEntity.ok("Restaurant Unblocked Successfully");
    }

    // ==========================
    // NGO Management
    // ==========================

    // Approve NGO
    @PutMapping("/ngos/{id}/approve")
    public ResponseEntity<String> approveNgo(
            @PathVariable Long id) {

        adminService.approveNgo(id);

        return ResponseEntity.ok("NGO Approved Successfully");
    }

    // Reject NGO
    @PutMapping("/ngos/{id}/reject")
    public ResponseEntity<String> rejectNgo(
            @PathVariable Long id) {

        adminService.rejectNgo(id);

        return ResponseEntity.ok("NGO Rejected Successfully");
    }

    // Block NGO
    @PutMapping("/ngos/{id}/block")
    public ResponseEntity<String> blockNgo(
            @PathVariable Long id) {

        adminService.blockNgo(id);

        return ResponseEntity.ok("NGO Blocked Successfully");
    }

    // Unblock NGO
    @PutMapping("/ngos/{id}/unblock")
    public ResponseEntity<String> unblockNgo(
            @PathVariable Long id) {

        adminService.unblockNgo(id);

        return ResponseEntity.ok("NGO Unblocked Successfully");
    }
    
    @PostMapping("/register")
    public ResponseEntity<Admin> registerAdmin(
            @RequestBody Admin admin){

        return ResponseEntity.ok(
            adminService.registerAdmin(admin)
        );

    }
    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(){

        return ResponseEntity.ok(
            adminService.getDashboardData()
        );

    }
    @GetMapping("/recent-donations")
    public ResponseEntity<List<AdminDonationDTO>> recentDonations(){

        List<AdminDonationDTO> list =
                donationRepository
                .findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(donation -> {

                    AdminDonationDTO dto =
                            new AdminDonationDTO();

                    dto.setDonationId(
                        donation.getDonationId()
                    );

                    dto.setFoodName(
                        donation.getFoodName()
                    );

                    dto.setRestaurantName(
                        donation.getRestaurant()
                        .getRestaurantName()
                    );

                    if(donation.getNgo()!=null){
                        dto.setNgoName(
                            donation.getNgo()
                            .getNgoName()
                        );
                    }

                    dto.setQuantity(
                        donation.getQuantity()
                    );

                    dto.setStatus(
                        donation.getStatus().name()
                    );

                    dto.setCreatedAt(
                        donation.getCreatedAt()
                    );

                    return dto;

                })
                .toList();


        return ResponseEntity.ok(list);

    }
    
    @GetMapping("/recent-users")
    public ResponseEntity<?> recentUsers(){

        return ResponseEntity.ok(
            userRepository.findTop5ByOrderByCreatedAtDesc()
        );

    }
    @GetMapping("/restaurants")
    public ResponseEntity<?> getRestaurants(){

        return ResponseEntity.ok(

            restaurantRepository.findAll()
            .stream()
            .map(restaurant -> {

                AdminRestaurantDTO dto =
                        new AdminRestaurantDTO();

                dto.setRestaurantId(
                    restaurant.getRestaurantId()
                );

                dto.setRestaurantName(
                    restaurant.getRestaurantName()
                );

                dto.setOwnerName(
                    restaurant.getOwnerName()
                );

                dto.setPhone(
                    restaurant.getPhone()
                );

                dto.setCity(
                    restaurant.getCity()
                );

                dto.setLicenseNumber(
                    restaurant.getLicenseNumber()
                );

                dto.setStatus(
                    restaurant.getStatus()
                );

                return dto;

            })
            .toList()

        );

    }
    @GetMapping("/admin-ngos")
    public ResponseEntity<List<AdminNgoDTO>> getNgos(){


        List<AdminNgoDTO> list =
                ngoRepository.findAll()
                .stream()
                .map(ngo -> {


                    AdminNgoDTO dto =
                            new AdminNgoDTO();



                    dto.setNgoId(
                        ngo.getNgoId()
                    );


                    dto.setNgoName(
                        ngo.getNgoName()
                    );


                    dto.setOwnerName(
                        ngo.getOwnerName()
                    );


                    dto.setPhone(
                        ngo.getPhone()
                    );


                    dto.setCity(
                        ngo.getCity()
                    );


                    dto.setRegistrationNumber(
                        ngo.getRegistrationNumber()
                    );


                    dto.setStatus(
                        ngo.getStatus()
                    );



                    return dto;


                })
                .toList();



        return ResponseEntity.ok(list);

    }
    @GetMapping("/admin-volunteers")
    public ResponseEntity<List<AdminVolunteerDTO>> getVolunteers(){


        List<AdminVolunteerDTO> volunteers =
                volunteerRepository.findAll()
                .stream()
                .map(volunteer -> {


                    AdminVolunteerDTO dto =
                            new AdminVolunteerDTO();



                    dto.setVolunteerId(
                        volunteer.getVolunteerId()
                    );


                    dto.setVolunteerName(
                        volunteer.getFullName()
                    );


                    if(volunteer.getUser()!=null){

                        dto.setEmail(
                            volunteer.getUser()
                            .getEmail()
                        );

                    }



                    dto.setPhone(
                        volunteer.getPhone()
                    );


                    dto.setCity(
                        volunteer.getCity()
                    );


                    dto.setVehicleType(
                        volunteer.getAvailability()
                    );


                    dto.setStatus(
                        volunteer.getStatus()
                    );



                    return dto;


                })
                .toList();



        return ResponseEntity.ok(volunteers);

    }
    @GetMapping("/admin-donations")
    public ResponseEntity<List<AdminDonationDTO>> getDonations(){


        List<AdminDonationDTO> donations =

                donationRepository.findAll()
                .stream()
                .map(donation -> {


                    AdminDonationDTO dto =
                            new AdminDonationDTO();


                    dto.setDonationId(
                        donation.getDonationId()
                    );


                    dto.setFoodName(
                        donation.getFoodName()
                    );


                    if(donation.getRestaurant()!=null){

                        dto.setRestaurantName(
                            donation.getRestaurant()
                            .getRestaurantName()
                        );

                    }



                    if(donation.getNgo()!=null){

                        dto.setNgoName(
                            donation.getNgo()
                            .getNgoName()
                        );

                    }



                    dto.setQuantity(
                        donation.getQuantity()
                    );


                    dto.setStatus(
                    	    donation.getStatus().name()
                    	);


                    dto.setCreatedAt(
                        donation.getCreatedAt()
                    );



                    return dto;


                })
                .toList();



        return ResponseEntity.ok(donations);

    }
    @GetMapping("/admin-reports")
    public ResponseEntity<AdminReportDTO> getReports(){


        AdminReportDTO dto =
                new AdminReportDTO();



        dto.setTotalDonations(
            donationRepository.count()
        );



        dto.setTotalRestaurants(
            restaurantRepository.count()
        );



        dto.setTotalNgos(
            ngoRepository.count()
        );



        dto.setTotalVolunteers(
            volunteerRepository.count()
        );



        dto.setCompletedDonations(

            donationRepository
            .countByStatus(
                DonationStatus.COMPLETED
            )

        );



        dto.setPendingDonations(

            donationRepository
            .countByStatus(
                DonationStatus.ASSIGNED
            )

        );



        dto.setExpiredDonations(

            donationRepository
            .countByStatus(
                DonationStatus.EXPIRED
            )

        );



        return ResponseEntity.ok(dto);

    }
    @GetMapping("/profile/{id}")
    public ResponseEntity<AdminProfileDTO> getProfile(
            @PathVariable Long id
    ){


        Admin admin =
            adminRepository.findById(id)
            .orElseThrow(
                () -> new RuntimeException("Admin not found")
            );



        AdminProfileDTO dto =
                new AdminProfileDTO();



        dto.setAdminId(
            admin.getAdminId()
        );


        dto.setAdminName(
            admin.getAdminName()
        );


        dto.setEmail(
            admin.getEmail()
        );


        dto.setRole(
            admin.getRole()
        );


        dto.setStatus(
            admin.getStatus()
        );


        dto.setCreatedAt(
            admin.getCreatedAt()
        );



        return ResponseEntity.ok(dto);


    }
 // ==========================
 // Volunteer Management
 // ==========================

 // Approve Volunteer
 @PutMapping("/volunteers/{id}/approve")
 public ResponseEntity<String> approveVolunteer(@PathVariable Long id) {

     adminService.approveVolunteer(id);

     return ResponseEntity.ok("Volunteer Approved Successfully");
 }

 // Reject Volunteer
 @PutMapping("/volunteers/{id}/reject")
 public ResponseEntity<String> rejectVolunteer(@PathVariable Long id) {

     adminService.rejectVolunteer(id);

     return ResponseEntity.ok("Volunteer Rejected Successfully");
 }

 // Block Volunteer
 @PutMapping("/volunteers/{id}/block")
 public ResponseEntity<String> blockVolunteer(@PathVariable Long id) {

     adminService.blockVolunteer(id);

     return ResponseEntity.ok("Volunteer Blocked Successfully");
 }

 // Unblock Volunteer
 @PutMapping("/volunteers/{id}/unblock")
 public ResponseEntity<String> unblockVolunteer(@PathVariable Long id) {

     adminService.unblockVolunteer(id);

     return ResponseEntity.ok("Volunteer Unblocked Successfully");
 }
}