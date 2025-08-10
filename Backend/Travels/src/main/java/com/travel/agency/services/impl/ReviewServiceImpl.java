package com.travel.agency.services.impl;

import com.travel.agency.config.CustomUserDetails;
import com.travel.agency.dto.ReviewDTO;
import com.travel.agency.dto.ReviewRequest;
import com.travel.agency.entities.Review;
import com.travel.agency.repositories.ReviewRepository;
import com.travel.agency.repositories.TripRepository;
import com.travel.agency.repositories.UserRepository;
import com.travel.agency.services.ReviewService;
import com.travel.agency.util.mapper.ReviewMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final UserRepository userRepository;
    private final TripRepository tripRepository;

    @Autowired
    public ReviewServiceImpl(ReviewRepository reviewRepository, ReviewMapper reviewMapper, UserRepository userRepository, TripRepository tripRepository) {
        this.reviewRepository = reviewRepository;
        this.reviewMapper = reviewMapper;
        this.userRepository = userRepository;
        this.tripRepository = tripRepository;
    }

    @Override
    public ReviewDTO createReview(ReviewRequest reviewRequest) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || !(auth.getPrincipal() instanceof CustomUserDetails)) {
            throw new RuntimeException("User is not authenticated");
        }

        Long userId = ((CustomUserDetails) auth.getPrincipal()).getId();
        Review review = Review.builder().comment(reviewRequest.getComment())
                .rate(reviewRequest.getRate())
                .user(userRepository.getById(userId))
                .trip(tripRepository.getById(reviewRequest.getTripId()))
                .reviewDate(LocalDateTime.now())
                .build();

        reviewRepository.save(review);
        return reviewMapper.createReviewDTO(review);
    }

    @Override
    public List<ReviewDTO> getReviews() {
        return reviewMapper.createReviewDTO(reviewRepository.findAll());
    }

    @Override
    public List<ReviewDTO> getReviews(long tripId) {
        return reviewMapper.createReviewDTO(
                reviewRepository.findAllByTripId(tripId));
    }
}
