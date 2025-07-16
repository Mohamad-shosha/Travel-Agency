import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {

images = [
  'assets/trips/1.jpg',
  'assets/trips/slideshow.jpg',
  'assets/trips/3.jpg',
  'assets/trips/5.jpg',
  'assets/trips/4.jpg'
];


  currentIndex = 0;
  intervalId?: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.clearAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 5000); // 5 ثواني للانتقال
  }

  clearAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
    this.clearAutoSlide();
    this.startAutoSlide();
  }
}
