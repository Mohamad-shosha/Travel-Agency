package com.travel.agency.services.impl;

import com.travel.agency.dto.CityDTO;
import com.travel.agency.repositories.CityRepository;
import com.travel.agency.services.CityService;
import com.travel.agency.util.mapper.CityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {
    private final CityRepository cityRepository;
    public final CityMapper cityMapper;

    @Autowired
    public CityServiceImpl(CityRepository cityRepository, CityMapper cityMapper) {
        this.cityRepository = cityRepository;
        this.cityMapper = cityMapper;
    }

    @Override
    public List<CityDTO> findAllCities() {
        return cityMapper.toCityDto(cityRepository.findAll());
    }
}
