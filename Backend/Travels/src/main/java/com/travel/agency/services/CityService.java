package com.travel.agency.services;

import com.travel.agency.dto.CityDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CityService {
    public List<CityDTO> findAllCities();
}
