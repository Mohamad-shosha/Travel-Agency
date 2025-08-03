package com.travel.agency.dto;

import com.travel.agency.entities.enums.Role;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String alternateEmail;
    private String phoneNumber;
    private Role role;
    private LocalDateTime createdAt;
}
