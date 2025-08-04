import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { TripService, Trip } from './trip.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit, AfterViewInit, OnDestroy {
  trips: Trip[] = [];

  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef<HTMLDivElement>;

  private autoScrollIntervalId: any;

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tripService.getAllTrips().subscribe({
      next: (data) => {
        this.trips = data;
        this.startAutoScroll();
      },
      error: (err) => console.error('Error loading trips:', err),
    });
  }

  ngAfterViewInit() {
    const container = this.scrollContainer.nativeElement;

    container.addEventListener('scroll', () => {
      this.applyScaleEffect();
    });

    this.applyScaleEffect();
  }

  applyScaleEffect() {
    const container = this.scrollContainer.nativeElement;
    const cards = container.querySelectorAll('.trip-card');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    cards.forEach((card) => {
      const element = card as HTMLElement;
      const cardCenter = element.offsetLeft + element.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      const maxDistance = element.clientWidth * 1.5;

      let scale = 1 - Math.min(distance / maxDistance, 1) * 0.15;
      element.style.transform = `scale(${scale})`;
    });
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  onBookNow(trip: Trip) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/reservation', trip.id]);
    }
  }

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -560,
      behavior: 'smooth',
    });
    this.resetAutoScroll();
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 560,
      behavior: 'smooth',
    });
    this.resetAutoScroll();
  }

  startAutoScroll() {
    this.autoScrollIntervalId = setInterval(() => {
      const container = this.scrollContainer.nativeElement;
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 280, behavior: 'smooth' });
      }
    }, 4000);
  }

  stopAutoScroll() {
    if (this.autoScrollIntervalId) {
      clearInterval(this.autoScrollIntervalId);
      this.autoScrollIntervalId = null;
    }
  }

  resetAutoScroll() {
    this.stopAutoScroll();
    setTimeout(() => this.startAutoScroll(), 7000);
  }
}
