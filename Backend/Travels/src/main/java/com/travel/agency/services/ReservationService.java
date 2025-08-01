package com.travel.agency.services;

import com.travel.agency.dto.ReservationDto;
import com.travel.agency.entities.Reservation;
import com.travel.agency.dto.ReservationRequest;
import com.travel.agency.entities.enums.ReservationStatus;

import java.util.List;

public interface ReservationService {
    Reservation createReservation(Long userId, ReservationRequest request);

    List<Reservation> findByUserId(Long userId);

    void cancelReservation(Long userId, Long reservationId);

    void reactivateReservation(Long userId, Long reservationId);

    public void confirmPendingReservations();

    List<ReservationDto> findAll();

    List<ReservationDto> getCanceledReservations();
    
}
