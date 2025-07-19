package com.travel.agency.entities;

import lombok.Data;

@Data
public class ReservationRequest {
    private Long tripId;
    private int numberOfPeople;
}