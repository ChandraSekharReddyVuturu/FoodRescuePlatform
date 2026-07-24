package com.foodrescue.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileUploadUtil {

    // Folder where files will be stored
    private static final String UPLOAD_DIR = "uploads/";

    /**
     * Upload File
     *
     * @param file MultipartFile
     * @return uploaded file name
     * @throws IOException
     */
    public String uploadFile(MultipartFile file) throws IOException {

        if (file == null || file.isEmpty()) {
            return null;
        }

        // Create uploads folder if not exists
        Path uploadPath = Paths.get(UPLOAD_DIR);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique file name
        String originalFileName = file.getOriginalFilename();

        String extension = "";

        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }

        String fileName = UUID.randomUUID().toString() + extension;

        Path filePath = uploadPath.resolve(fileName);

        Files.copy(file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }

    /**
     * Delete File
     *
     * @param fileName
     * @return boolean
     */
    public boolean deleteFile(String fileName) {

        try {

            Path path = Paths.get(UPLOAD_DIR + fileName);

            return Files.deleteIfExists(path);

        } catch (IOException e) {

            e.printStackTrace();

            return false;
        }
    }

}
