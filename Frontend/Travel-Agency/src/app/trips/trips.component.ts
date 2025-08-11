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
import { ReviewService, Review } from '../review-list/review.service';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

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
  private isManualScrolling = false;
  private userInteracted = false;

  math = Math;

  reviewModalOpen: boolean = false;
  newReview: Review & { tripId?: number } = {
    name: '',
    nameOfTrip: '',
    imageUrl: '',
    comment: '',
    rate: 0,
    reviewDate: new Date().toISOString(),
    tripId: undefined,
  };

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private router: Router,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.tripService.getAllTrips().subscribe({
      next: (data) => {
        this.trips = data;
        setTimeout(() => this.startAutoScroll(), 0);
      },
      error: (err) => console.error('Error loading trips:', err),
    });
  }

  ngAfterViewInit() {
    const container = this.scrollContainer.nativeElement;
    container.addEventListener('scroll', this.debouncedCenterActiveCard);
    this.applyScaleEffect();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
    this.scrollContainer.nativeElement.removeEventListener(
      'scroll',
      this.debouncedCenterActiveCard
    );
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
      const scale = 1 - Math.min(distance / maxDistance, 1) * 0.15;
      element.style.transform = `scale(${scale})`;
    });
  }

  centerActiveCard = () => {
    const container = this.scrollContainer.nativeElement;
    const cards = Array.from(container.querySelectorAll('.trip-card')) as HTMLElement[];
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    let closestCard: HTMLElement | null = null;
    let closestDistance = Infinity;
    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });
    if (closestCard) {
      const cardRect = (closestCard as HTMLElement).getBoundingClientRect();
      const scrollDelta = cardRect.left + cardRect.width / 2 - containerCenter;
      container.scrollBy({ left: scrollDelta, behavior: 'smooth' });
    }
    this.applyScaleEffect();
  };

  debouncedCenterActiveCard = this.debounce(() => {
    if (!this.isManualScrolling) {
      this.centerActiveCard();
    }
  }, 200);

  debounce(func: Function, wait: number) {
    let timeout: any;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  onBookNow(trip: Trip) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/reservation', trip.id]);
    }
  }

  openReviewModal(trip: Trip) {
    this.newReview = {
      name: '',
      nameOfTrip: trip.title,
      imageUrl: trip.imageUrl,
      comment: '',
      rate: 0,
      reviewDate: new Date().toISOString(),
      tripId: trip.id,
    };
    this.reviewModalOpen = true;
  }

  closeReviewModal() {
    this.reviewModalOpen = false;
  }

submitReview() {
  if (!this.newReview.name.trim() || !this.newReview.comment.trim() || this.newReview.rate <= 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete',
      text: 'Please fill all review fields',
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
      width: window.innerWidth < 600 ? '65%' : '300px',
    });
    return;
  }

  const token = this.authService.getToken();

  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Not logged in',
      text: 'You must be logged in to submit a review.',
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
      width: window.innerWidth < 600 ? '65%' : '300px',
    });
    return;
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.reviewService.createReview(this.newReview, headers).subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Review Submitted',
        text: 'Review submitted successfully!',
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
        width: window.innerWidth < 600 ? '65%' : '300px',
      });
      this.closeReviewModal();
    },
    error: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error submitting review',
        timer: 2500,
        showConfirmButton: false,
        timerProgressBar: true,
        width: window.innerWidth < 600 ? '65%' : '300px',
      });
    },
  });
}


  scrollLeft() {
    this.userInteracted = true;
    this.isManualScrolling = true;
    const container = this.scrollContainer.nativeElement;
    const card = container.querySelector('.trip-card') as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 16;
    container.scrollBy({
      left: -(cardWidth + gap),
      behavior: 'smooth',
    });
    this.resetAutoScroll();
    setTimeout(() => {
      this.isManualScrolling = false;
    }, 500);
  }

  scrollRight() {
    this.userInteracted = true;
    this.isManualScrolling = true;
    const container = this.scrollContainer.nativeElement;
    const card = container.querySelector('.trip-card') as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 16;
    container.scrollBy({
      left: cardWidth + gap,
      behavior: 'smooth',
    });
    this.resetAutoScroll();
    setTimeout(() => {
      this.isManualScrolling = false;
    }, 500);
  }

  startAutoScroll() {
    this.autoScrollIntervalId = setInterval(() => {
      if (this.userInteracted) return;
      const container = this.scrollContainer.nativeElement;
      const card = container.querySelector('.trip-card') as HTMLElement;
      if (!card) return;
      const cardWidth = card.offsetWidth;
      const gap = 16;
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      }
    }, 8000);
  }

  stopAutoScroll() {
    if (this.autoScrollIntervalId) {
      clearInterval(this.autoScrollIntervalId);
      this.autoScrollIntervalId = null;
    }
  }

  resetAutoScroll() {
    this.stopAutoScroll();
    this.userInteracted = true;
    setTimeout(() => {
      this.userInteracted = false;
      this.startAutoScroll();
    }, 10000);
  }
}
