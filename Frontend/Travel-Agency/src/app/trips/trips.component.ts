import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TripService } from './trip.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit, AfterViewInit {

  trips: any[] = [];

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripService.getAllTrips().subscribe({
      next: (data) => this.trips = data,
      error: (err) => console.error('Error loading trips:', err)
    });
  }

  ngAfterViewInit() {
    this.startCanvasAnimation();
  }

  startCanvasAnimation() {
    const canvas = document.getElementById('backgroundCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const dots = Array.from({ length: 50 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      dx: (Math.random() - 0.5) * 0.8,
      dy: (Math.random() - 0.5) * 0.8,
    }));

    function animate() {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = '#64b5f6';
        ctx.fill();
        dot.x += dot.dx;
        dot.y += dot.dy;

        // bounce from edges
        if (dot.x < 0 || dot.x > w) dot.dx *= -1;
        if (dot.y < 0 || dot.y > h) dot.dy *= -1;
      });
      requestAnimationFrame(animate);
    }

    animate();

    // handle resize
    window.addEventListener('resize', () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    });
  }
}
