package com.shop.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AdInfoDto {
    private String id;
    private String adTitle;
    private LocalDate date;
    private int views;
    private int clicks;
    private float price;
    private float clicks_per_view;
    private float cost_per_click;
}
