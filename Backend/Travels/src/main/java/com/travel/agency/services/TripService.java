package com.travel.agency.services;

import com.travel.agency.dto.TripDTO;

import java.util.List;

public interface TripService {
    List<TripDTO> getAllTrips();

    TripDTO getTripById(Long id);

    List<TripDTO> getTripsByCity(Long cityId);

    TripDTO createTrip(TripDTO tripDTO);

    TripDTO updateTrip(Long id, TripDTO tripDTO);

    void deleteTrip(Long id);
}