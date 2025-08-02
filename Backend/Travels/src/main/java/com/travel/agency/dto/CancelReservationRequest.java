package com.travel.agency.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CancelReservationRequest {
    private String cancelReason;
}