package com.travel.agency.entities;
import com.travel.agency.dto.TripDTO;
import lombok.Builder;
import lombok.Data;
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
}
