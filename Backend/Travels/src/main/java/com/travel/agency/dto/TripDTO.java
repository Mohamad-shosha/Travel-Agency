package com.travel.agency.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TripDTO {

    private Long id;
    private String title;
    private String description;
    private Double price;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer availableSeats;
    private String imageUrl;

    private Long cityId;
    private String cityName;
}