package net.perryz.ai_ootd.service;

import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import net.perryz.ai_ootd.client.AiClient;
import net.perryz.ai_ootd.dto.GenerateJournalDto;
import net.perryz.ai_ootd.model.JournalEntry;

@Service
@Slf4j
public class JournalService {
    private final AiClient aiClient;
    private final ImageStorageService imageStorageService;

    public JournalService(AiClient aiClient, ImageStorageService imageStorageService) {
        this.aiClient = aiClient;
        this.imageStorageService = imageStorageService;
    }

    public JournalEntry generateNewJournal(GenerateJournalDto generateJournalDto) {
        log.info("Reached generateNewJournal with DTO: {}", generateJournalDto);
        imageStorageService.storeImage(generateJournalDto.ootdImage());
        return new JournalEntry("Some dummy journal text", "image path", java.time.LocalDateTime.now());
    }
}
