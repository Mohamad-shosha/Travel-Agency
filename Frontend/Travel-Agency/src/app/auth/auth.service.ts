import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

interface User {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  private userEmail = new BehaviorSubject<string | null>(this.getEmailFromStorage());

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: LoginData): Observable<string> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { responseType: 'text' });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setEmail(email: string): void {
    localStorage.setItem('email', email);
    this.userEmail.next(email);
  }

  getEmailFromStorage(): string | null {
    return localStorage.getItem('email');
  }

  getUserEmail(): Observable<string | null> {
    return this.userEmail.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.userEmail.next(null);
  }
}
