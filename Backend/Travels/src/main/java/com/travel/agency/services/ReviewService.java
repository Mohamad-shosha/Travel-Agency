package com.travel.agency.services;

import com.travel.agency.dto.ReviewDTO;
import com.travel.agency.dto.ReviewRequest;

import java.util.List;

public interface ReviewService {
    ReviewDTO createReview(ReviewRequest reviewRequest);

    List<ReviewDTO> getReviews();

    List<ReviewDTO> getReviews(long tripId);
}
