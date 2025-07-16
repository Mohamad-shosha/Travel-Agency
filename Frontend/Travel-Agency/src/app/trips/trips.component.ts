import { Component, OnInit } from '@angular/core';
import { TripService } from './trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  trips: any[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripService.getAllTrips().subscribe({
      next: (data) => this.trips = data,
      error: (err) => console.error('Error loading trips:', err)
    });
  }
}
