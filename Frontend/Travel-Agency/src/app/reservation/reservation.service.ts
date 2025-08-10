import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = environment.apiUrl + '/reservations';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/my`, {
      headers: this.getHeaders()
    });
  }

  createReservation(tripId: number, numberOfPeople: number): Observable<any> {
    const body = { tripId, numberOfPeople };
    return this.http.post(`${this.baseUrl}`, body, { headers: this.getHeaders() });
  }

  cancelReservationWithReason(reservationId: number, reason: string): Observable<string> {
    const body = { cancelReason: reason };
    return this.http.put(`${this.baseUrl}/${reservationId}/cancel`, body, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }

  restoreReservation(reservationId: number): Observable<string> {
    return this.http.put(`${this.baseUrl}/${reservationId}/reactivate`, null, {
      headers: this.getHeaders(),
      responseType: 'text'
    });
  }
}
