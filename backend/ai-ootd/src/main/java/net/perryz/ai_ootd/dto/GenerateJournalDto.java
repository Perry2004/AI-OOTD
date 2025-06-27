package net.perryz.ai_ootd.dto;

import org.springframework.web.multipart.MultipartFile;

public record GenerateJournalDto(MultipartFile ootdImage, String interestingThing, String mood) {
}
