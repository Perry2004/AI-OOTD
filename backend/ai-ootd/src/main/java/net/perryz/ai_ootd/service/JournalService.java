package net.perryz.ai_ootd.service;

import org.springframework.stereotype.Service;

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
        var generatedText = aiClient.generateJournal(generateJournalDto);
        var generatedJournal = new JournalEntry(generatedText, generateJournalDto.getDataUrl(),
                java.time.LocalDateTime.now());
        log.info("Generated journal entry: {}, {}", generatedJournal.journal(), generatedJournal.createdTime());
        return generatedJournal;
    }
}
