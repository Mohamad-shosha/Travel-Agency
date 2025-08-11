import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { ReviewService, Review } from './review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent implements OnInit, AfterViewInit, OnDestroy {
  reviews: Review[] = [];
  loading = true;

  @ViewChild('scrollContainer', { read: ElementRef })
  scrollContainer!: ElementRef<HTMLDivElement>;

  private animationFrameId: any;
  private isPaused = false;
  isMobile = false;

  constructor(private reviewService: ReviewService, private ngZone: NgZone) {}

  ngOnInit(): void {
    // تحديد هل الجهاز موبايل أم لا
    this.isMobile = /Mobi|Android/i.test(navigator.userAgent);

    this.reviewService.getAllReviews().subscribe({
      next: (data) => {
        this.reviews = [...data, ...data];
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.scrollContainer.nativeElement.addEventListener('scroll', () =>
        this.onScroll()
      );
      this.animate();
    });
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  onScroll() {
    this.updateCardsScale();
  }

  animate = () => {
    if (!this.isPaused) {
      this.autoScroll();
    }
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  autoScroll() {
    if (this.isMobile) {
      // لا تفعل التمرير التلقائي في الموبايل
      return;
    }

    const container = this.scrollContainer.nativeElement;
    const firstHalfScrollWidth = container.scrollWidth / 2;

    if (container.scrollLeft >= firstHalfScrollWidth) {
      container.scrollLeft = container.scrollLeft - firstHalfScrollWidth;
    } else {
      container.scrollBy({ left: 1, behavior: 'auto' });
    }
    this.updateCardsScale();
  }

  updateCardsScale() {
    const container = this.scrollContainer.nativeElement;
    const cards = container.querySelectorAll('.review-card');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    cards.forEach((card) => {
      const el = card as HTMLElement;
      const cardCenter = el.offsetLeft + el.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      const maxDistance = el.clientWidth * 1.2;
      const scale = 1 - Math.min(distance / maxDistance, 1) * 0.3;

      el.style.transform = `scale(${scale})`;
      el.style.filter = `brightness(${0.8 + (scale - 0.7) * 1.5})`;
      el.style.zIndex = scale > 0.95 ? '10' : '1';
      el.classList.toggle('active', scale > 1);
    });
  }

  pauseScroll() {
    this.isPaused = true;
  }

  resumeScroll() {
    this.isPaused = false;
  }

  scrollPrev() {
    this.pauseScroll();
    const container = this.scrollContainer.nativeElement;
    const cards = container.querySelectorAll('.review-card');
    if (cards.length === 0) return;

    const totalCards = cards.length / 2;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const el = card as HTMLElement;
      const cardCenter = el.offsetLeft + el.clientWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    let newIndex = (closestIndex - 1 + totalCards) % totalCards;
    this.scrollToCard(newIndex);
    setTimeout(() => this.resumeScroll(), 8000);
  }

  scrollNext() {
    this.pauseScroll();
    const container = this.scrollContainer.nativeElement;
    const cards = container.querySelectorAll('.review-card');
    if (cards.length === 0) return;

    const totalCards = cards.length / 2;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const el = card as HTMLElement;
      const cardCenter = el.offsetLeft + el.clientWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    let newIndex = (closestIndex + 1) % totalCards;
    this.scrollToCard(newIndex);
    setTimeout(() => this.resumeScroll(), 8000);
  }

  scrollToCard(index: number) {
    const container = this.scrollContainer.nativeElement;
    const cards = container.querySelectorAll('.review-card');
    if (!cards[index]) return;

    const card = cards[index] as HTMLElement;
    const scrollLeft =
      card.offsetLeft - container.clientWidth / 2 + card.clientWidth / 2;

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
  }
}
