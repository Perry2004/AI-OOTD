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

    public JournalService(AiClient aiClient) {
        this.aiClient = aiClient;
    }

    public JournalEntry generateNewJournal(GenerateJournalDto generateJournalDto) {
        log.info("Reached generateNewJournal with DTO: {}", generateJournalDto);
        return new JournalEntry("Some dummy journal text", "image path", java.time.LocalDateTime.now());
    }

    @PostConstruct
    public void test() {
        try {
            log.info(aiClient.invokeAi("Hello, how are you?"));
        } catch (Exception e) {
            log.error("Error invoking AI client: {}", e.getMessage(), e);
            e.printStackTrace();
        }
    }

}
