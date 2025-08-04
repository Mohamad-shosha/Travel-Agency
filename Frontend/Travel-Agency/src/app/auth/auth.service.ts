import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// حدثت واجهة User لتشمل الحقول الجديدة
interface User {
  name: string;
  email: string;
  alternateEmail?: string;  // اختياري
  phoneNumber: string;
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
    return new Observable(observer => {
      this.http.post(`${this.baseUrl}/login`, credentials, { responseType: 'text' })
        .subscribe(token => {
          this.setToken(token);
          const decoded = this.parseJwt(token);
          if (decoded && decoded.sub) {
            this.setEmail(decoded.sub);
          }
          if (decoded && decoded.role) {
            localStorage.setItem('role', decoded.role);
          }
          observer.next(token);
          observer.complete();
        }, err => {
          observer.error(err);
        });
    });
  }

  private parseJwt(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
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
    localStorage.removeItem('role');
    this.userEmail.next(null);
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }
}
