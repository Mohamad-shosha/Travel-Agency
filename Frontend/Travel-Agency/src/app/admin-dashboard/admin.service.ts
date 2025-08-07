// src/app/admin-dashboard/admin.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'https://travel-agency-production.up.railway.app/api/admin';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, {
      headers: this.getAuthHeaders()
    });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  changeUserRole(id: number, role: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/users/${id}/role?role=${role}`, null, {
      headers: this.getAuthHeaders()
    });
  }

  getAllReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reservations`, {
      headers: this.getAuthHeaders()
    });
  }

  getCancelledReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/canceled`, {
      headers: this.getAuthHeaders()
    });
  }

  cancelReservation(reservationId: number, reason: string): Observable<void> {
  return this.http.put<void>(`${this.baseUrl}/reservations/cancel`, 
    { reservationId, cancelReason: reason }, 
    { headers: this.getAuthHeaders() });
}

}
