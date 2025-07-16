import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  message = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.message = 'Registration successful! You can now log in.';
        this.error = '';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'An error occurred during registration.';
        this.message = '';
        console.error(err);
      }
    });
  }
}
