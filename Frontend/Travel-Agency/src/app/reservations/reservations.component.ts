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
    this.reservationService.cancelReservation(id).subscribe({
      next: (message) => {
        Swal.fire({
          icon: 'success',
          title: 'Cancelled',
          text: message,
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true
        });
        const reservation = this.reservations.find(r => r.id === id);
        if (reservation) {
          reservation.status = 'CANCELLED';
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to cancel reservation',
          footer: err.message || ''
        });
      }
    });
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
          timerProgressBar: true
        });
        const reservation = this.reservations.find(r => r.id === id);
        if (reservation) {
          reservation.status = 'PENDING';
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to restore reservation',
          footer: err.message || ''
        });
      }
    });
  }
}
