import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  message: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
next: (token) => {
  this.authService.setToken(token);
  this.authService.setEmail(this.email); // 👈 هنا أضفنا حفظ الإيميل

  this.error = '';
  this.message = 'Login successful!';
  this.router.navigate(['/trips']);
}
    });
  }
}
