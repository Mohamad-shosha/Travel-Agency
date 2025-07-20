import { Component, OnInit } from '@angular/core';
import { TripService, Trip } from './trip.service';
import { AuthService } from '../auth/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  trips: Trip[] = [];

  constructor(
    private tripService: TripService,
    private authService: AuthService,  
    private router: Router              
  ) {}

  ngOnInit() {
    this.tripService.getAllTrips().subscribe({
      next: (data) => this.trips = data,
      error: (err) => console.error('Error loading trips:', err)
    });
  }

  onBookNow(trip: Trip) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/reservation', trip.id]);
    }
  }
}
