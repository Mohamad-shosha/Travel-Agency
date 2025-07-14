package com.travel.agency.services;

import com.travel.agency.dto.CountryDTO;

import java.util.List;

public interface CountryService {
    List<CountryDTO> getAllCountries();
}