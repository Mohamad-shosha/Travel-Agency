import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ReservationRequest {
  tripId: number;
  numberOfPeople: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'https://travel-agency-production.up.railway.app/api/reservations';

  constructor(private http: HttpClient) {}

  createReservation(tripId: number, numberOfPeople: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body: ReservationRequest = { tripId, numberOfPeople };
    return this.http.post(this.baseUrl, body, { headers });
  }
}
