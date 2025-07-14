package com.travel.agency.services.impl;

import com.travel.agency.dto.TripDTO;
import com.travel.agency.entities.City;
import com.travel.agency.entities.Trip;
import com.travel.agency.repositories.CityRepository;
import com.travel.agency.repositories.TripRepository;
import com.travel.agency.services.TripService;
import com.travel.agency.util.mapper.TripMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;
    private final CityRepository cityRepository;
    private final TripMapper tripMapper;

    public TripServiceImpl(TripRepository tripRepository, CityRepository cityRepository, TripMapper tripMapper) {
        this.tripRepository = tripRepository;
        this.cityRepository = cityRepository;
        this.tripMapper = tripMapper;
    }

    @Override
    public List<TripDTO> getAllTrips() {
        return tripRepository.findAll()
                .stream()
                .map(tripMapper::toTripDto)
                .collect(Collectors.toList());
    }

    @Override
    public TripDTO getTripById(Long id) {
        Trip trip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + id));
        return tripMapper.toTripDto(trip);
    }

    @Override
    public List<TripDTO> getTripsByCity(Long cityId) {
        return tripRepository.findByCityId(cityId)
                .stream()
                .map(tripMapper::toTripDto)
                .collect(Collectors.toList());
    }

    @Override
    public TripDTO createTrip(TripDTO tripDTO) {
        City city = cityRepository.findById(tripDTO.getCityId())
                .orElseThrow(() -> new RuntimeException("City not found with id: " + tripDTO.getCityId()));
        Trip trip = tripMapper.toTrip(tripDTO);
        trip.setCity(city);
        Trip saved = tripRepository.save(trip);
        return tripMapper.toTripDto(saved);
    }

    @Override
    public TripDTO updateTrip(Long id, TripDTO tripDTO) {
        Trip existingTrip = tripRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + id));

        City city = cityRepository.findById(tripDTO.getCityId())
                .orElseThrow(() -> new RuntimeException("City not found with id: " + tripDTO.getCityId()));

        existingTrip.setTitle(tripDTO.getTitle());
        existingTrip.setDescription(tripDTO.getDescription());
        existingTrip.setPrice(tripDTO.getPrice());
        existingTrip.setStartDate(tripDTO.getStartDate());
        existingTrip.setEndDate(tripDTO.getEndDate());
        existingTrip.setAvailableSeats(tripDTO.getAvailableSeats());
        existingTrip.setImageUrl(tripDTO.getImageUrl());
        existingTrip.setCity(city);

        Trip updated = tripRepository.save(existingTrip);
        return tripMapper.toTripDto(updated);
    }

    @Override
    public void deleteTrip(Long id) {
        if (!tripRepository.existsById(id)) {
            throw new RuntimeException("Trip not found with id: " + id);
        }
        tripRepository.deleteById(id);
    }
}