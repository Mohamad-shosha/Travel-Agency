package com.travel.agency.dto;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ReservationDto {
    private Long id;
    private Long userId;
    private String userName;
    private TripDTO tripDTO;
    private int numberOfPeople;
    private BigDecimal totalPrice;
    private LocalDateTime reservationDate;
    private String status;
    private String cancellationReason;
}
