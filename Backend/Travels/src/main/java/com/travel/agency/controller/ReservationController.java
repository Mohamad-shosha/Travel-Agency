package com.travel.agency.controller;

import com.travel.agency.config.CustomUserDetails;
import com.travel.agency.entities.Reservation;
import com.travel.agency.dto.ReservationDto;
import com.travel.agency.dto.ReservationRequest;
import com.travel.agency.services.ReservationService;
import com.travel.agency.util.mapper.ReservationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ReservationController {

    private final ReservationService reservationService;
    private final ReservationMapper reservationMapper;

    @PostMapping
    public ResponseEntity<ReservationDto> reserveTrip(@RequestBody ReservationRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long userId = ((CustomUserDetails) auth.getPrincipal()).getId();

        Reservation reservation = reservationService.createReservation(userId, request);
        return ResponseEntity.ok(reservationMapper.toDto(reservation));
    }
}
