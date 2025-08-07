import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  private baseUrl = environment.apiUrl + '/trips';

  constructor(private http: HttpClient) {}

  getAllTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl);
  }

  getTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/${id}`);
  }
}
