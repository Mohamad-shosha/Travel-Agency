package com.travel.agency.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private int tripId;
    private String comment;
    private int rate;
}
