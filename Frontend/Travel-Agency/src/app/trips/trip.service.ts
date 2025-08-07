// src/app/trips/trip.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trip {
  id: number;
  title: string;
  description: string;
  price: number;
  startDate: string;       
  endDate: string;
  availableSeats: number;
  imageUrl: string;
  cityId: number;
  cityName: string;
}

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private baseUrl = 'https://travel-agency-production.up.railway.app/api/trips';

  constructor(private http: HttpClient) {}

  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl);
  }

    getTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/${id}`);
  }
  
}
