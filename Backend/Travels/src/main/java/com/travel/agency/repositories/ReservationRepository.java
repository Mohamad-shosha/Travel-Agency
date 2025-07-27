package com.travel.agency.repositories;

import com.travel.agency.entities.Reservation;
import com.travel.agency.entities.enums.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUserId(Long userId);

    List<Reservation> findByStatus(ReservationStatus status);
}