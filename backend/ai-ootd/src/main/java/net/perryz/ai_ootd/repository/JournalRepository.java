package net.perryz.ai_ootd.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import net.perryz.ai_ootd.model.Journal;

@Repository
public interface JournalRepository extends MongoRepository<Journal, String> {

}
