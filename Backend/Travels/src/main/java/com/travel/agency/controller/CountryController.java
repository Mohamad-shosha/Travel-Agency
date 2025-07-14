package com.travel.agency.controller;

import com.travel.agency.dto.CountryDTO;
import com.travel.agency.services.impl.CountryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/countries")
public class CountryController {
    private final CountryServiceImpl countryServiceImpl;

    @Autowired
    public CountryController(CountryServiceImpl countryServiceImpl) {
        this.countryServiceImpl = countryServiceImpl;
    }

    @GetMapping
    public List<CountryDTO> getCountries() {
        return countryServiceImpl.getAllCountries() ;
    }
}