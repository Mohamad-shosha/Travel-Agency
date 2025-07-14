package com.travel.agency.services.impl;

import com.travel.agency.dto.CountryDTO;
import com.travel.agency.entities.Country;
import com.travel.agency.repositories.CountryRepository;
import com.travel.agency.services.CountryService;
import com.travel.agency.util.mapper.CountryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {
    private final CountryRepository countryRepository;
    private final CountryMapper countryMapper;

    @Autowired
    public CountryServiceImpl(CountryRepository countryRepository, CountryMapper countryMapper) {
        this.countryRepository = countryRepository;
        this.countryMapper = countryMapper;
    }

    @Override
    public List<CountryDTO> getAllCountries() {
        List<Country> countries = countryRepository.findAll();
        return countryMapper.toCountryDTO(countries);
    }

}
