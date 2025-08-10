package com.travel.agency.repositories;

import com.travel.agency.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAll();

    List<Review> findAllByTripId(Long tripId);
}
