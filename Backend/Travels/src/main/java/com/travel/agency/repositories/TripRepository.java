package com.travel.agency.repositories;


import com.travel.agency.entities.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByCityId(Long cityId);

    Trip getById(long tripId);
}