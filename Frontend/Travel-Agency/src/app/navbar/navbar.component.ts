import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userEmail: string | null = '';
  isAdmin = false;
  mobileMenuOpen = false;
  currentUrl: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.urlAfterRedirects;
    });
  }

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
    this.closeMobileMenu();
  }

  scrollToSection(sectionId: string): void {
    if (this.currentUrl !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    this.closeMobileMenu();
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
