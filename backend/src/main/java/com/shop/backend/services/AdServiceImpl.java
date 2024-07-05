package com.shop.backend.services;

import com.shop.backend.dto.AdInfoDto;
import com.shop.backend.models.AdInfo;
import com.shop.backend.repositories.AdRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class AdServiceImpl implements AdService{

    private final AdRepository adRepository;

    @Override
    public boolean createNewAd(AdInfoDto adInfoDto) {
        String title = adInfoDto.getAdTitle();
        if (checkExists(title)) {
            log.warn("AdInfo with such title already exist {}", title);
            return false;
        }
        AdInfo adInfo = buildAdInfoFromDto(adInfoDto);
        adRepository.save(adInfo);
        log.info("AdInfo created with id {}", adInfo.getId());
        return true;
    }

    @Override
    public boolean deleteAdById(String id) {
        return adRepository.findById(id)
                .map(adInfo -> {
                    adRepository.delete(adInfo);
                    return true;
                })
                .orElse(false);
    }


    @Override
    public List<AdInfo> getAllAds() {
        return adRepository.findAll();
    }

    @Override
    public AdInfo getAdById(String id) {
        return adRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ad not found with id: " + id));
    }



    private AdInfo buildAdInfoFromDto(AdInfoDto adInfoDto) {
        return AdInfo.builder()
                .adTitle(adInfoDto.getAdTitle())
                .date(LocalDate.now())
                .views(adInfoDto.getViews())
                .price(adInfoDto.getPrice())
                .clicks(adInfoDto.getClicks())
                .clicks_per_view((adInfoDto.getClicks() / (float) adInfoDto.getViews()))
                .cost_per_click(adInfoDto.getPrice()/adInfoDto.getClicks())
                .build();
    }

    private boolean checkExists(String title){
        return adRepository.findByAdTitle(title).isPresent();
    }

}
