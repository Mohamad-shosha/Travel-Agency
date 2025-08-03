package com.travel.agency.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    private String name;
    private String email;
    private String alternateEmail;
    private String phoneNumber;
    private String password;
}