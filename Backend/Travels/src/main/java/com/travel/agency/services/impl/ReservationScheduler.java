package com.travel.agency.services.impl;

import com.travel.agency.services.ReservationStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReservationScheduler {

    private final ReservationStatusService reservationStatusService;

    @Scheduled(cron = "0 0 */8 * * *")
    public void scheduleAutoConfirm() {
        reservationStatusService.confirmPendingReservations();
    }
}
