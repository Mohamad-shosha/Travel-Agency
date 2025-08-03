package com.travel.agency.repositories;

import com.travel.agency.entities.Reservation;
import com.travel.agency.entities.Trip;
import com.travel.agency.entities.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);

    List<Reservation> findByStatus(ReservationStatus status);

    List<Reservation> findAll();

    Optional<Reservation> findByIdAndUserId(Long reservationId, Long userId);
}