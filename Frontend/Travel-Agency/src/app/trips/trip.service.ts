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
  private baseUrl = 'http://localhost:8080/api/trips'; 

  constructor(private http: HttpClient) {}

  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl);
  }
}
