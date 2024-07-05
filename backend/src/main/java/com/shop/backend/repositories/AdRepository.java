package com.shop.backend.repositories;

import com.shop.backend.models.AdInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdRepository extends MongoRepository<AdInfo, String> {
    Optional<AdInfo> findByAdTitle(String adTitle);
}
