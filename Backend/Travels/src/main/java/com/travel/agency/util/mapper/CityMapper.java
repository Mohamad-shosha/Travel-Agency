package com.travel.agency.util.mapper;

import com.travel.agency.dto.CityDTO;
import com.travel.agency.entities.City;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CountryMapper.class})
public interface CityMapper {
    CityDTO toCityDto(City city);

    List<CityDTO> toCityDto(List<City> cities);

    City toCity(CityDTO cityDTO);

    List<City> toCity(List<CityDTO> cities);
}

