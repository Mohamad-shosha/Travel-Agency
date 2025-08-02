import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8080/api/reservations';

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

  // ✅ التعديل هنا: السبب بقى في body بدل URL
  cancelReservationWithReason(reservationId: number, reason: string): Observable<string> {
    const body = { cancelReason: reason }; // يطابق كلاس CancelReservationRequest في الباك
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
