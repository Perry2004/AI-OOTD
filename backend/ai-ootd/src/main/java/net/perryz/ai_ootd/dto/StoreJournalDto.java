package net.perryz.ai_ootd.dto;

import org.springframework.web.multipart.MultipartFile;

public record StoreJournalDto(MultipartFile ootdImage, String journal) {
}