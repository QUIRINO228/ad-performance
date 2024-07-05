package com.shop.backend.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shop.backend.dto.AdInfoDto;
import com.shop.backend.models.AdInfo;
import com.shop.backend.services.AdService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ads")
@AllArgsConstructor
@CrossOrigin("http://localhost:3000")
public class AdController {

    private final AdService adService;
    private final ObjectMapper objectMapper;

    @PostMapping("/save_new_ad")
    public ResponseEntity<Map<String, String>> createNewAd(@RequestBody String adInfoDtoJson) throws JsonProcessingException {
        AdInfoDto adInfoDto = convertJsonToAdInfoDto(adInfoDtoJson);
        return adService.createNewAd(adInfoDto)
                ? ResponseEntity.ok().body(Map.of("message", "Product successfully creating"))
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Deleting product failed"));
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteAdById(@PathVariable String id) {
        return adService.deleteAdById(id)
                ? ResponseEntity.ok().body(Map.of("message", "AdInfo successfully deleted"))
                : ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Deleting AdInfo failed"));
    }


    @GetMapping("/get-all-ads")
    public List<AdInfo> getAllAds() {
        return adService.getAllAds();
    }

    @GetMapping("/get-ad/{id}")
    public AdInfo getAdById(@PathVariable String id) {
        return adService.getAdById(id);
    }


    private AdInfoDto convertJsonToAdInfoDto(String adInfoDtoJson) throws JsonProcessingException {
        return objectMapper.readValue(adInfoDtoJson, AdInfoDto.class);
    }
}
