package net.perryz.ai_ootd.controller;

import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import net.perryz.ai_ootd.dto.GenerateJournalDto;
import net.perryz.ai_ootd.service.JournalService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.http.ResponseEntity;

@RestController
@Slf4j
public class JournalController {

    private final JournalService journalService;

    public JournalController(JournalService journalService) {
        this.journalService = journalService;
    }

    @PutMapping("/journal")
    public ResponseEntity<String> generateNewJournal(@ModelAttribute GenerateJournalDto generateJournalDto) {
        // [TODO]: handle request
        logRequest("PUT", "/journal", generateJournalDto.toString());
        var newEntry = journalService.generateNewJournal(generateJournalDto);
        return ResponseEntity.ok().body(newEntry.toString());
    }

    @PostMapping("/journal")
    public ResponseEntity<String> storeJournalEntry(@RequestBody String entity) {
        // [TODO]: handle request
        logRequest("POST", "/journal", entity);
        return ResponseEntity.ok().body("A journal entry should be stored");
    }

    @DeleteMapping("/journal")
    public ResponseEntity<String> deleteJournalEntry(@RequestBody String entity) {
        // [TODO]: handle request
        logRequest("DELETE", "/journal", entity);
        return ResponseEntity.ok().body("A journal entry should be deleted");
    }

    @GetMapping("/journals")
    public ResponseEntity<String> getAllJournals() {
        // [TODO]: handle request
        logRequest("GET", "/journals", null);
        return ResponseEntity.ok().body("All journals should be retrieved");
    }

    private void logRequest(String method, String endpoint, String body) {
        log.info("Received {} request to {} with body: {}", method, endpoint, body);
    }
}
