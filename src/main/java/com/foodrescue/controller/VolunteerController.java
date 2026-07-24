package com.foodrescue.controller;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.foodrescue.dto.VolunteerDTO;
import com.foodrescue.service.VolunteerService;



@RestController
@RequestMapping("/api/volunteers")
@CrossOrigin(origins = "*")
public class VolunteerController {



    @Autowired
    private VolunteerService volunteerService;





    // =========================================
    // REGISTER VOLUNTEER PROFILE
    // =========================================

    @PostMapping("/register")
    public ResponseEntity<VolunteerDTO> registerVolunteer(
            @RequestBody VolunteerDTO volunteerDTO) {


        VolunteerDTO savedVolunteer =
                volunteerService
                .registerVolunteer(volunteerDTO);


        return new ResponseEntity<>(
                savedVolunteer,
                HttpStatus.CREATED
        );

    }






    // =========================================
    // GET PROFILE BY USER ID
    // =========================================

    @GetMapping("/user/{userId}")
    public ResponseEntity<VolunteerDTO> getByUserId(
            @PathVariable Long userId) {


        return ResponseEntity.ok(

                volunteerService
                .getVolunteerByUserId(userId)

        );

    }







    // =========================================
    // GET BY VOLUNTEER ID
    // =========================================

    @GetMapping("/{id}")
    public ResponseEntity<VolunteerDTO> getVolunteerById(
            @PathVariable Long id) {


        return ResponseEntity.ok(

                volunteerService
                .getVolunteerById(id)

        );

    }







    // =========================================
    // GET ALL VOLUNTEERS
    // =========================================

    @GetMapping
    public ResponseEntity<List<VolunteerDTO>> getAllVolunteers(){


        return ResponseEntity.ok(

                volunteerService
                .getAllVolunteers()

        );

    }







    // =========================================
    // UPDATE VOLUNTEER
    // =========================================

    @PutMapping("/{id}")
    public ResponseEntity<VolunteerDTO> updateVolunteer(
            @PathVariable Long id,
            @RequestBody VolunteerDTO volunteerDTO){


        return ResponseEntity.ok(

                volunteerService
                .updateVolunteer(
                        id,
                        volunteerDTO)

        );

    }







    // =========================================
    // DELETE VOLUNTEER
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVolunteer(
            @PathVariable Long id){


        volunteerService
        .deleteVolunteer(id);


        return ResponseEntity.ok(
                "Volunteer deleted successfully."
        );

    }







    // =========================================
    // FIND BY CITY
    // =========================================

    @GetMapping("/city/{city}")
    public ResponseEntity<List<VolunteerDTO>> getByCity(
            @PathVariable String city){


        return ResponseEntity.ok(

                volunteerService
                .getVolunteersByCity(city)

        );

    }







    // =========================================
    // FIND BY STATUS
    // =========================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<VolunteerDTO>> getByStatus(
            @PathVariable String status){


        return ResponseEntity.ok(

                volunteerService
                .getVolunteersByStatus(status)

        );

    }







    // =========================================
    // FIND BY AVAILABILITY
    // =========================================

    @GetMapping("/availability/{availability}")
    public ResponseEntity<List<VolunteerDTO>> getByAvailability(
            @PathVariable String availability){


        return ResponseEntity.ok(

                volunteerService
                .getVolunteersByAvailability(
                        availability)

        );

    }







    // =========================================
    // SEARCH BY NAME
    // =========================================

    @GetMapping("/search/{name}")
    public ResponseEntity<List<VolunteerDTO>> searchVolunteer(
            @PathVariable String name){


        return ResponseEntity.ok(

                volunteerService
                .searchVolunteerByName(name)

        );

    }


}