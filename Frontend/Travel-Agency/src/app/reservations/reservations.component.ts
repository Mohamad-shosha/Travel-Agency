import { Component, OnInit } from '@angular/core';
import { ReservationService } from './reservations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: any[] = [];

  selectedReservationId: number | null = null;
  selectedReason: string = '';
  customReason: string = '';

  reasonLabels: { [key: string]: string } = {
    PERSONAL_ISSUE: 'Personal issue',
    ILLNESS: 'Illness',
    WEATHER_CONDITIONS: 'Weather conditions',
    SCHEDULE_CONFLICT: 'Change of plans',
    TRANSPORTATION_ISSUE: 'Transportation issue',
    FOUND_BETTER_DEAL: 'Found a better deal',
    TRAVEL_RESTRICTIONS: 'Travel restrictions',
    BOOKING_MISTAKE: 'Booking mistake',
    FINANCIAL_ISSUES: 'Financial issues',
    OTHER: 'Other'
  };

  cancellationReasons: string[] = Object.keys(this.reasonLabels);

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: () => {
        this.reservations = [];
      }
    });
  }

  cancel(id: number): void {
    this.selectedReservationId = id;
    this.selectedReason = '';
    this.customReason = '';
  }

  confirmCancellation(): void {
    if (!this.selectedReason) {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Please select a reason',
        width: window.innerWidth < 600 ? '65%' : '300px',
      });
      return;
    }

    const reasonToSend = this.selectedReason === 'OTHER' ? this.customReason.trim() : this.selectedReason;

    if (this.selectedReason === 'OTHER' && !reasonToSend) {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Please enter a custom reason',
        width: window.innerWidth < 600 ? '65%' : '300px',
      });
      return;
    }

    this.reservationService.cancelReservationWithReason(this.selectedReservationId!, reasonToSend).subscribe({
      next: (message) => {
        Swal.fire({
          icon: 'success',
          title: 'Cancelled',
          text: message,
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true,
          width: window.innerWidth < 600 ? '65%' : '300px',
        });
        const reservation = this.reservations.find(r => r.id === this.selectedReservationId);
        if (reservation) {
          reservation.status = 'CANCELLED';
          reservation.cancellationReason = reasonToSend;
        }
        this.closeCancelModal();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to cancel reservation',
          width: window.innerWidth < 600 ? '65%' : '300px',
        });
      }
    });
  }

  closeCancelModal(): void {
    this.selectedReservationId = null;
    this.selectedReason = '';
    this.customReason = '';
  }

  restore(id: number): void {
    this.reservationService.restoreReservation(id).subscribe({
      next: (message) => {
        Swal.fire({
          icon: 'success',
          title: 'Restored',
          text: message,
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true,
          width: window.innerWidth < 600 ? '65%' : '300px',
        });
        const reservation = this.reservations.find(r => r.id === id);
        if (reservation) {
          reservation.status = 'PENDING';
          reservation.cancellationReason = null;
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to restore reservation',
          width: window.innerWidth < 600 ? '65%' : '300px',
        });
      }
    });
  }
}
