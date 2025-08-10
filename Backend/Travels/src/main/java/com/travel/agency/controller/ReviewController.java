package com.travel.agency.controller;

import com.travel.agency.dto.ReviewDTO;
import com.travel.agency.dto.ReviewRequest;
import com.travel.agency.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/create")
    public ReviewDTO save(@RequestBody ReviewRequest reviewRequest) {
        return reviewService.createReview(reviewRequest);
    }

    @GetMapping("get/{id}")
    public List<ReviewDTO> getReview(@PathVariable long id) {
        return reviewService.getReviews(id);
    }

    @GetMapping("/get")
    public List<ReviewDTO> getReview() {
        return reviewService.getReviews();
    }
}
