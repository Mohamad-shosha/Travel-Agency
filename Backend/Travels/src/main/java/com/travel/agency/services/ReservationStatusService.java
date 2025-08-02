package com.travel.agency.services;

public interface ReservationStatusService {
    public void cancelReservation(Long userId, Long reservationId);

    public void reactivateReservation(Long userId, Long reservationId);

    public void cancelReservationWithReason(Long userId, Long reservationId, String reason);

    public void confirmPendingReservations();
}
