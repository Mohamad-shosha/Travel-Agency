package com.travel.agency.services.impl;

import com.travel.agency.dto.ReservationDto;
import com.travel.agency.entities.Reservation;
import com.travel.agency.dto.ReservationRequest;
import com.travel.agency.entities.Trip;
import com.travel.agency.entities.User;
import com.travel.agency.entities.enums.ReservationStatus;
import com.travel.agency.repositories.ReservationRepository;
import com.travel.agency.repositories.TripRepository;
import com.travel.agency.repositories.UserRepository;
import com.travel.agency.services.ReservationService;
import com.travel.agency.util.mapper.ReservationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final TripRepository tripRepository;
    private final ReservationMapper reservationMapper;

    @Override
    public Reservation createReservation(Long userId, ReservationRequest request) {
        User user = userRepository.findById(userId).orElseThrow();
        Trip trip = tripRepository.findById(request.getTripId()).orElseThrow();

        BigDecimal totalPrice = trip.getPrice().multiply(BigDecimal.valueOf(request.getNumberOfPeople()));

        Reservation reservation = Reservation.builder()
                .user(user)
                .trip(trip)
                .numberOfPeople(request.getNumberOfPeople())
                .totalPrice(totalPrice)
                .reservationDate(LocalDateTime.now())
                .status(ReservationStatus.PENDING)
                .build();

        return reservationRepository.save(reservation);
    }

    @Override
    public List<Reservation> findByUserId(Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    @Override
    public List<ReservationDto> findAll() {
        List<Reservation> reservations = reservationRepository.findAll();
        return reservations.stream()
                .map(reservationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReservationDto> getCanceledReservations() {
        List<Reservation> canceled = reservationRepository.findByStatus(ReservationStatus.CANCELLED);
        return canceled.stream()
                .map(reservationMapper::toDto)
                .collect(Collectors.toList());
    }
}