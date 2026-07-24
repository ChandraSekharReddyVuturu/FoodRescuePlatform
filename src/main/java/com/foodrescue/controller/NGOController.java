package com.foodrescue.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.foodrescue.dto.NGORegisterDTO;
import com.foodrescue.entity.NGO;
import com.foodrescue.service.NGOService;
import com.foodrescue.dto.NGODTO;

@RestController
@RequestMapping("/api/ngos")
@CrossOrigin(origins = "*")
public class NGOController {

    @Autowired
    private NGOService ngoService;

    // Register NGO

    @PostMapping("/register")
    public ResponseEntity<NGODTO> registerNGO(
            @RequestBody NGORegisterDTO dto) {

        return new ResponseEntity<>(
                ngoService.registerNGO(dto),
                HttpStatus.CREATED);

    }

    // Get NGO Profile
    @GetMapping("/{ngoId}")
    public NGODTO getNGOProfile(
            @PathVariable Long ngoId) {

        return ngoService.getNGOProfile(ngoId);

    }

    // Update NGO Profile
    @PutMapping("/{ngoId}")
    public ResponseEntity<NGO> updateNGO(
            @PathVariable Long ngoId,
            @RequestBody NGO ngo) {

        return ResponseEntity.ok(
                ngoService.updateNGO(ngoId, ngo));

    }

}