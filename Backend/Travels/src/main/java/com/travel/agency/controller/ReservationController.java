package com.travel.agency.controller;

import com.travel.agency.config.CustomUserDetails;
import com.travel.agency.dto.CancelReservationRequest;
import com.travel.agency.dto.UserDTO;
import com.travel.agency.entities.Reservation;
import com.travel.agency.dto.ReservationDto;
import com.travel.agency.dto.ReservationRequest;
import com.travel.agency.services.ReservationService;
import com.travel.agency.services.ReservationStatusService;
import com.travel.agency.services.UserService;
import com.travel.agency.util.mapper.ReservationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ReservationController {

    private final ReservationService reservationService;
    private final ReservationStatusService reservationStatusService;
    private final ReservationMapper reservationMapper;
    private final UserService userService;

    @Autowired
    public ReservationController(ReservationService reservationService, ReservationMapper reservationMapper,
                                 UserService userService, ReservationStatusService reservationStatusService) {
        this.reservationService = reservationService;
        this.reservationMapper = reservationMapper;
        this.userService = userService;
        this.reservationStatusService = reservationStatusService;
    }


    @PostMapping
    public ResponseEntity<ReservationDto> reserveTrip(@RequestBody ReservationRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long userId = ((CustomUserDetails) auth.getPrincipal()).getId();

        Reservation reservation = reservationService.createReservation(userId, request);
        return ResponseEntity.ok(reservationMapper.toDto(reservation));
    }

    @GetMapping("/my")
    public ResponseEntity<List<ReservationDto>> getMyReservations(Principal principal) {
        Optional<UserDTO> userDTOOpt = userService.getUserByEmail(principal.getName());
        if (userDTOOpt.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        UserDTO userDTO = userDTOOpt.get();

        List<Reservation> reservations = reservationService.findByUserId(userDTO.getId());


        List<ReservationDto> dtoList = reservations.stream()
                .map(reservationMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelReservation(
            @PathVariable Long id,
            @RequestBody CancelReservationRequest request
    ) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long userId = ((CustomUserDetails) auth.getPrincipal()).getId();
        reservationStatusService.cancelReservationWithReason(userId, id, request.getCancelReason());
        return ResponseEntity.ok("Reservation cancelled successfully");
    }


    @PutMapping("/{id}/reactivate")
    public ResponseEntity<String> reactivateReservation(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long userId = ((CustomUserDetails) auth.getPrincipal()).getId();

        reservationStatusService.reactivateReservation(userId, id);
        return ResponseEntity.ok("Reservation reactivated successfully");
    }

}
