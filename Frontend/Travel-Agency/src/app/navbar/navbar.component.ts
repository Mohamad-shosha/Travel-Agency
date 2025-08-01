import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userEmail: string | null = '';
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.getUserEmail().subscribe(email => {
      this.userEmail = email;
      this.isLoggedIn = this.authService.isLoggedIn();
      const role = this.authService.getUserRole();
      this.isAdmin = role === 'ADMIN';
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
