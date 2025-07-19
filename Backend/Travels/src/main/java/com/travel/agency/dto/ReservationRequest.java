package com.travel.agency.dto;

import lombok.Data;

@Data
public class ReservationRequest {
    private Long tripId;
    private int numberOfPeople;
}