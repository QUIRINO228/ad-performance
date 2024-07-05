package com.shop.backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "ad_info")
public class AdInfo {
    @Id
    private String id;
    private String adTitle;
    private LocalDate date;
    private int views;
    private int clicks;
    private float price;
    private float clicks_per_view;
    private float cost_per_click;
}
