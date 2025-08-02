package com.travel.agency.services.impl;

import com.travel.agency.entities.Reservation;
import com.travel.agency.entities.enums.ReservationStatus;
import com.travel.agency.repositories.ReservationRepository;
import com.travel.agency.services.ReservationStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationStatusServiceImpl implements ReservationStatusService {

    private final ReservationRepository reservationRepository;

    public void cancelReservation(Long userId, Long reservationId) {
        Reservation reservation = getReservationOrThrow(reservationId);
        if (!reservation.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to cancel this reservation");
        }
        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }

    public void cancelReservationWithReason(Long userId, Long reservationId, String reason) {
        Reservation reservation = getReservationByIdAndUserOrThrow(reservationId, userId);
        if (reservation.getStatus() == ReservationStatus.CANCELLED) {
            throw new RuntimeException("Reservation already cancelled");
        }
        reservation.setStatus(ReservationStatus.CANCELLED);
        reservation.setCancellationReason(reason);
        reservationRepository.save(reservation);
    }

    public void reactivateReservation(Long userId, Long reservationId) {
        Reservation reservation = getReservationOrThrow(reservationId);
        if (!reservation.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to reactivate this reservation");
        }
        if (reservation.getStatus() != ReservationStatus.CANCELLED) {
            throw new RuntimeException("Only cancelled reservations can be reactivated");
        }
        reservation.setStatus(ReservationStatus.PENDING);
        reservationRepository.save(reservation);
    }

    @Scheduled(cron = "0 0 */8 * * *")
    public void confirmPendingReservations() {
        List<Reservation> pendingReservations = reservationRepository.findByStatus(ReservationStatus.PENDING);
        for (Reservation reservation : pendingReservations) {
            reservation.setStatus(ReservationStatus.CONFIRMED);
        }
        reservationRepository.saveAll(pendingReservations);
        System.out.println("Confirmed " + pendingReservations.size() + " reservations");
    }

    private Reservation getReservationOrThrow(Long reservationId) {
        return reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }

    private Reservation getReservationByIdAndUserOrThrow(Long reservationId, Long userId) {
        return reservationRepository.findByIdAndUserId(reservationId, userId)
                .orElseThrow(() -> new RuntimeException("Reservation not found for this user"));
    }
}
