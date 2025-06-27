package net.perryz.ai_ootd.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

public record Journal(String journal, String ootdImageUrl, LocalDateTime time, @Id String id) {
    public Journal(String journal, String ootdImageUrl, LocalDateTime createdTime) {
        this(journal, ootdImageUrl, createdTime, null);
    }
}
