import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit, OnDestroy {

  name = '';
  email = '';
  password = '';
  message = '';
  error = '';

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;
  private mouseX = 0;
  private mouseY = 0;

  private points: { x: number, y: number, vx: number, vy: number }[] = [];

  private resizeHandler = this.resizeCanvas.bind(this);
  private mouseMoveHandler = this.onMouseMove.bind(this);
  private routerSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    this.initCanvasAndAnimation();

    // اشترك في تغيرات الراوتر عشان لما ترجع للصفحة يعيد تشغيل الانيميشن
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (this.router.url === '/register') {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    });
  }

  ngOnDestroy() {
    this.stopAnimation();
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }

  private initCanvasAndAnimation() {
    this.canvas = document.getElementById('backgroundCanvas') as HTMLCanvasElement;
    if (!this.canvas) {
      setTimeout(() => this.initCanvasAndAnimation(), 100);
      return;
    }
    const context = this.canvas.getContext('2d');
    if (!context) {
      console.error('Failed to get 2D context from canvas');
      return;
    }
    this.ctx = context;

    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('mousemove', this.mouseMoveHandler);

    window.addEventListener('resize', this.resizeHandler);
    window.addEventListener('mousemove', this.mouseMoveHandler);

    this.resizeCanvas();
    this.initPoints(60);
    this.animate();
  }

  private resizeCanvas() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  private onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  private initPoints(count: number) {
    this.points = [];
    for (let i = 0; i < count; i++) {
      this.points.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }
  }

  private animate = () => {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const point of this.points) {
      point.x += point.vx;
      point.y += point.vy;

      if (point.x < 0 || point.x > this.canvas.width) point.vx *= -1;
      if (point.y < 0 || point.y > this.canvas.height) point.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      this.ctx.fill();
    }

    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) {
        const p1 = this.points[i];
        const p2 = this.points[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

        if (dist < 120) {
          const distToMouse1 = Math.hypot(p1.x - this.mouseX, p1.y - this.mouseY);
          const distToMouse2 = Math.hypot(p2.x - this.mouseX, p2.y - this.mouseY);
          if (distToMouse1 < 200 || distToMouse2 < 200) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 120})`;
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
          }
        }
      }
    }

    this.animationId = requestAnimationFrame(this.animate);
  }

  startAnimation() {
    // لو الانيميشن مش شغال شغله
    if (!this.animationId) {
      this.animate();
    }
  }

  stopAnimation() {
    window.removeEventListener('resize', this.resizeHandler);
    window.removeEventListener('mousemove', this.mouseMoveHandler);
    cancelAnimationFrame(this.animationId);
    this.animationId = 0;
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

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
