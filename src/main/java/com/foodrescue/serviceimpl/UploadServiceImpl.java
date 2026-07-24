package com.foodrescue.serviceimpl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.foodrescue.service.UploadService;

@Service
public class UploadServiceImpl implements UploadService {

    private final String UPLOAD_DIR =
            "src/main/resources/static/uploads/";

    @Override
    public String uploadImage(MultipartFile file) {

        try {

            if (file.isEmpty()) {

                throw new RuntimeException("File is empty.");

            }

            String originalName =
                    file.getOriginalFilename();

            String extension =
                    originalName.substring(
                            originalName.lastIndexOf("."));

            String fileName =
                    UUID.randomUUID() + extension;

            Path path =
                    Paths.get(UPLOAD_DIR);

            if (!Files.exists(path)) {

                Files.createDirectories(path);

            }

            Files.copy(

                    file.getInputStream(),

                    path.resolve(fileName),

                    StandardCopyOption.REPLACE_EXISTING

            );

            return "/uploads/" + fileName;

        }

        catch (IOException e) {

            throw new RuntimeException("Image Upload Failed");

        }

    }

}