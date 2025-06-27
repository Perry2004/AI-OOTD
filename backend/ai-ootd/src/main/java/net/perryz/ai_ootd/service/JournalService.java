package net.perryz.ai_ootd.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import net.perryz.ai_ootd.client.AiClient;
import net.perryz.ai_ootd.dto.GenerateJournalDto;
import net.perryz.ai_ootd.dto.StoreJournalDto;
import net.perryz.ai_ootd.model.Journal;
import net.perryz.ai_ootd.repository.JournalRepository;

@Service
@Slf4j
public class JournalService {
    private final AiClient aiClient;
    private final ImageStorageService imageStorageService;
    private final JournalRepository journalRepository;

    public JournalService(AiClient aiClient, ImageStorageService imageStorageService,
            JournalRepository journalRepository) {
        this.aiClient = aiClient;
        this.imageStorageService = imageStorageService;
        this.journalRepository = journalRepository;
    }

    public Journal generateNewJournal(GenerateJournalDto generateJournalDto) {
        log.info("Reached generateNewJournal with DTO: {}", generateJournalDto);
        var generatedText = aiClient.generateJournal(generateJournalDto);
        var generatedJournal = new Journal(generatedText, null, LocalDateTime.now());
        log.info("Generated journal entry: {}, {}", generatedJournal.journal());
        return generatedJournal;
    }

    public void storeJournalEntry(StoreJournalDto storeJournalDto) {
        log.info("Storing journal entry: {}", storeJournalDto.journal());
        var imagePath = imageStorageService.storeImage(storeJournalDto.ootdImage());
        var journal = new Journal(storeJournalDto.journal(), imagePath, LocalDateTime.now());
        var savedJournal = journalRepository.save(journal);
        log.info("Stored journal entry with ID: {}, at path: {}", savedJournal.id(), imagePath);
    }

    public void deleteJournal(String journalId) {
        Journal targetJournal = journalRepository.findById(journalId)
                .orElseThrow(() -> new RuntimeException("Journal entry not found with ID: " + journalId));
        log.info("Deleting journal entry with ID: {}", targetJournal.id());
        journalRepository.deleteById(journalId);
        var imagePath = targetJournal.ootdImageUrl();
        imageStorageService.deleteImage(imagePath);
        log.info("Deleted journal entry with ID: {}, and image at path: {}", journalId, imagePath);
    }

    public List<Journal> getAllJournals() {
        log.info("Fetching all journal entries");
        return journalRepository.findAll();
    }
}
