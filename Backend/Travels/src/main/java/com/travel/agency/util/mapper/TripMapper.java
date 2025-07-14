package com.travel.agency.util.mapper;
import com.travel.agency.dto.CityDTO;
import com.travel.agency.dto.TripDTO;
import com.travel.agency.entities.City;
import com.travel.agency.entities.Trip;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TripMapper {

    @Mapping(source = "city.id", target = "cityId")
    @Mapping(source = "city.name", target = "cityName")
    TripDTO toTripDto(Trip trip);

    List<TripDTO> toTripDto(List<Trip> trips);

    Trip toTrip(TripDTO tripDTO);

    List<Trip> toTrip(List<TripDTO> trips);
}