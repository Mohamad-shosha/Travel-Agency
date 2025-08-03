package com.travel.agency.controller;

import com.travel.agency.dto.ReservationDto;
import com.travel.agency.dto.UserDTO;
import com.travel.agency.entities.enums.CancellationReasonOption;
import com.travel.agency.repositories.UserRepository;
import com.travel.agency.services.ReservationService;
import com.travel.agency.util.mapper.ReservationMapper;
import com.travel.agency.util.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final ReservationService reservationService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @GetMapping("/reservations")
    public List<ReservationDto> getAllReservations() {
        return reservationService.findAll();
    }

    @GetMapping("/canceled")
    public List<ReservationDto> getCanceledReservations() {
        return reservationService.getCanceledReservations();
    }

    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/cancellation-reasons")
    public List<String> getCancellationReasons() {
        return Arrays.stream(CancellationReasonOption.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

}
