import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService, Trip } from '../trips/trip.service';
import { ReservationService } from './reservation.service';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  tripId!: number;
  trip!: Trip;
  numberOfPeople: number = 1;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private reservationService: ReservationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tripId = +this.route.snapshot.paramMap.get('id')!;
    this.tripService.getTripById(this.tripId).subscribe({
      next: (data) => this.trip = data,
      error: () => this.errorMessage = 'Failed to load trip details'
    });
  }

  bookTrip() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.reservationService.createReservation(this.tripId, this.numberOfPeople).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Reservation Successful',
          text: 'Your trip reservation was completed successfully.',
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true
        });
        this.router.navigate(['/trips']);
      },
      error: (err) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Reservation Failed',
          text: 'Failed to make reservation. Please try again later.',
          footer: err.message || '',
          showConfirmButton: true
        });
      }
    });
  }
}
