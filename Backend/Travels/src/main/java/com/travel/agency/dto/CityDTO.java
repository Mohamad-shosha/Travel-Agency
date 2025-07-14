package com.travel.agency.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CityDTO {
    private String name;
    private String description;
    private CountryDTO country;
}