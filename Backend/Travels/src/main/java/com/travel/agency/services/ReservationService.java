package com.travel.agency.services;

import com.travel.agency.entities.Reservation;
import com.travel.agency.dto.ReservationRequest;

public interface ReservationService {
    Reservation createReservation(Long userId, ReservationRequest request);
}
