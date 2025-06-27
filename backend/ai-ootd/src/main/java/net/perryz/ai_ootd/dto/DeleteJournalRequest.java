package net.perryz.ai_ootd.dto;

public record DeleteJournalRequest(DeleteJournalData data) {

    public record DeleteJournalData(String _id) {
    }
}
