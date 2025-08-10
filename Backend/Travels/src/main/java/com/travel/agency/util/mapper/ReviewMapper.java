package com.travel.agency.util.mapper;

import com.travel.agency.dto.ReviewDTO;
import com.travel.agency.entities.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @Mapping(source = "comment",target = "comment")
    @Mapping(source = "rate",target = "rate")
    @Mapping(source = "reviewDate",target = "reviewDate")
    ReviewDTO createReviewDTO(Review review);

    List<ReviewDTO> createReviewDTO(List<Review> reviews);

    Review toReview(ReviewDTO reviewDTO);
}
