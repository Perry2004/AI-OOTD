package net.perryz.ai_ootd.model;

import java.time.LocalDateTime;

public record JournalEntry(String journal, String ootdImageUrl, LocalDateTime createdTime) {
}
