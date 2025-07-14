package com.travel.agency.util.mapper;

import com.travel.agency.dto.CountryDTO;
import com.travel.agency.entities.Country;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CountryMapper {

    CountryDTO toCountryDTO(Country country);

    List<CountryDTO> toCountryDTO(List<Country> countries);

    Country toCountry(CountryDTO countryDTO);
}
