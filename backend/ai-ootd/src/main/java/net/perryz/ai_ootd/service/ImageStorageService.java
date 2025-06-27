package net.perryz.ai_ootd.service;

import java.nio.file.Paths;
import java.security.MessageDigest;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ImageStorageService {
    private static final String storagePath = "uploads/";
    private final MessageDigest messageDigest;

    public ImageStorageService() {
        try {
            this.messageDigest = MessageDigest.getInstance("SHA-256");
        } catch (Exception e) {
            log.error("Failed to initialize MessageDigest", e);
            throw new RuntimeException("Could not initialize image storage service", e);
        }
    }

    public String storeImage(MultipartFile imageFile) {
        var imageName = getNameFromContentHash(imageFile);
        var imagePath = Paths.get(storagePath, imageName).toString();
        try {
            Paths.get(imagePath).toFile().getParentFile().mkdirs();
            imageFile.transferTo(Paths.get(imagePath));
            log.info("Stored image at: {}", imagePath);
            return imagePath;
        } catch (Exception e) {
            log.error("Failed to store image file", e);
            throw new RuntimeException("Could not store image file", e);
        }
    }

    public void deleteImage(String imagePath) {
        try {
            var file = Paths.get(imagePath).toFile();
            if (file.exists() && file.delete()) {
                log.info("Deleted image file at: {}", imagePath);
            } else {
                log.warn("Failed to delete image file at: {}", imagePath);
            }
        } catch (Exception e) {
            log.error("Failed to delete image file", e);
            throw new RuntimeException("Could not delete image file", e);
        }
    }

    /**
     * Generates a unique name for the image file based on its content hash.
     * Images of the same content will be stored with the same name and stored only
     * once.
     * 
     * @param imageFile
     * @return the unique name for the image file
     */
    private String getNameFromContentHash(MultipartFile imageFile) {
        try {
            byte[] fileBytes = imageFile.getBytes();
            byte[] hashBytes = messageDigest.digest(fileBytes);
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            var hashedName = sb.toString();
            String originalFilename = imageFile.getOriginalFilename();
            String fileExtension = ".jpg";
            if (originalFilename != null && originalFilename.lastIndexOf('.') != -1) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.'));
            }
            return hashedName + fileExtension;
        } catch (Exception e) {
            log.error("Failed to compute hash for image file", e);
            throw new RuntimeException("Could not compute image file name", e);
        }
    }
}
