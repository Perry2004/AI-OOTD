package net.perryz.ai_ootd.dto;

import java.util.Base64;

import org.springframework.web.multipart.MultipartFile;

public record GenerateJournalDto(MultipartFile ootdImage, String interestingThing, String mood) {
    public String getDataUrl() {
        if (ootdImage == null || ootdImage.isEmpty()) {
            throw new IllegalArgumentException("Image file cannot be null or empty");
        }

        try {
            var imageBytes = ootdImage.getBytes();
            var base64Image = Base64.getEncoder().encodeToString(imageBytes);
            String fileExtension = "jpg";
            String originalFilename = ootdImage.getOriginalFilename();
            if (originalFilename != null && originalFilename.lastIndexOf('.') != -1) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.') + 1);
            }
            return "data:image/" + fileExtension + ";base64," + base64Image;
        } catch (Exception e) {
            throw new RuntimeException("Could not encode image to base64", e);
        }

    }

}
