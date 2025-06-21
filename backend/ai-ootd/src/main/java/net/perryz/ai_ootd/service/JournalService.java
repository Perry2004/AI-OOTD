package net.perryz.ai_ootd.service;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import net.perryz.ai_ootd.dto.GenerateJournalDto;
import net.perryz.ai_ootd.model.JournalEntry;

@Service
@Slf4j
public class JournalService {
    public JournalEntry generateNewJournal(GenerateJournalDto generateJournalDto) {
        log.info("Reached generateNewJournal with DTO: {}", generateJournalDto);
        return new JournalEntry("Some dummy journal text", "image path", java.time.LocalDateTime.now());
    }
}
