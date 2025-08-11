import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Review {
  name: string;
  nameOfTrip: string;
  imageUrl: string;
  comment: string;
  rate: number;
  reviewDate: string;
  tripId?: number;  // مهم تضيفه هنا كخيار اختياري
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = `${environment.apiUrl}/reviews`;

  constructor(private http: HttpClient) {}

  getReviewsByTripId(tripId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/get/${tripId}`);
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/get`);
  }

  createReview(review: Review, headers?: HttpHeaders): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/create`, review, { headers });
  }
}
