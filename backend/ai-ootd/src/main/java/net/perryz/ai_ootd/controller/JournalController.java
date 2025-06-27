package net.perryz.ai_ootd.controller;

import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import net.perryz.ai_ootd.dto.DeleteJournalRequest;
import net.perryz.ai_ootd.dto.GenerateJournalDto;
import net.perryz.ai_ootd.dto.StoreJournalDto;
import net.perryz.ai_ootd.model.Journal;
import net.perryz.ai_ootd.service.JournalService;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Slf4j
public class JournalController {

    private final JournalService journalService;

    public JournalController(JournalService journalService) {
        this.journalService = journalService;
    }

    /**
     * Generate a new journal entry
     * 
     * @param generateJournalDto
     * @return
     */
    @PutMapping("/journal")
    public ResponseEntity<String> generateNewJournal(@ModelAttribute GenerateJournalDto generateJournalDto) {
        logRequest("PUT", "/journal", generateJournalDto.toString());
        var newEntry = journalService.generateNewJournal(generateJournalDto);
        return ResponseEntity.ok().body(newEntry.toString());
    }

    /**
     * Store a journal entry
     * 
     * @param entity
     * @return
     */
    @PostMapping("/journal")
    public ResponseEntity<String> storeJournalEntry(@ModelAttribute StoreJournalDto storeJournalDto) {
        logRequest("POST", "/journal", storeJournalDto.toString());
        journalService.storeJournalEntry(storeJournalDto);
        return ResponseEntity.ok().body("Journal entry should be stored");
    }

    /**
     * Delete a journal entry
     * 
     * @param deleteRequest
     * @return
     */
    @DeleteMapping("/journal")
    public ResponseEntity<String> deleteJournalEntry(@RequestBody DeleteJournalRequest deleteRequest) {
        logRequest("DELETE", "/journal", deleteRequest.toString());
        journalService.deleteJournal(deleteRequest.data()._id());
        return ResponseEntity.ok().body("A journal entry should be deleted");
    }

    /**
     * Get all journal entries
     * 
     * @return
     */
    @GetMapping("/journal")
    public ResponseEntity<List<Journal>> getAllJournals() {
        logRequest("GET", "/journals", null);
        return ResponseEntity.ok(journalService.getAllJournals());
    }

    private void logRequest(String method, String endpoint, String body) {
        log.info("Received {} request to {} with body: {}", method, endpoint, body);
    }
}
