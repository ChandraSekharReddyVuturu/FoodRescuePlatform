package com.foodrescue.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import com.foodrescue.service.UploadService;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin("*")
public class UploadController {

    @Autowired
    private UploadService uploadService;

    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(

            @RequestParam("file")
            MultipartFile file) {

        String imageUrl =
                uploadService.uploadImage(file);

        return ResponseEntity.ok(imageUrl);

    }

}