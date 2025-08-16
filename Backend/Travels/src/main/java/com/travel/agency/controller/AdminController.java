package com.travel.agency.controller;

import com.travel.agency.dto.ReservationDto;
import com.travel.agency.dto.UserDTO;
import com.travel.agency.entities.enums.CancellationReasonOption;
import com.travel.agency.repositories.UserRepository;
import com.travel.agency.services.ReservationService;
import com.travel.agency.services.TripService;
import com.travel.agency.services.UserService;
import com.travel.agency.util.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
    private final UserService userService;
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

    @PutMapping("/promote/{id}")
    public UserDTO promoteUserToAdmin(@PathVariable long id){
        return userService.promoteUserToAdmin(id);
    }
}
