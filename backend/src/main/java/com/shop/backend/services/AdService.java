package com.shop.backend.services;

import com.shop.backend.dto.AdInfoDto;
import com.shop.backend.models.AdInfo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdService {
    boolean createNewAd(AdInfoDto adInfoDto);

    boolean deleteAdById(String id);

    List<AdInfo> getAllAds();

    AdInfo getAdById(String id);
}
