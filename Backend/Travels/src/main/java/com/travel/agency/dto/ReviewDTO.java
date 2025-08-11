package com.travel.agency.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDTO {
    private String name;
    private String nameOfTrip;
    private String imageUrl;
    private String comment;
    private int rate;
    private LocalDateTime reviewDate;
}

