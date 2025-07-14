import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {

images = [
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1920&q=80',  // Pyramids
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',  // Desert camel
  'https://images.unsplash.com/photo-1526483360109-c30e8e20d5e2?auto=format&fit=crop&w=1920&q=80',  // Nile river boat
  'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?auto=format&fit=crop&w=1920&q=80',  // Egyptian sunset
  'https://images.unsplash.com/photo-1486308510493-cb708e78a742?auto=format&fit=crop&w=1920&q=80'   // Ancient temple
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
