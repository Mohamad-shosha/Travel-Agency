import { Component, AfterViewInit, OnDestroy, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="background-canvas-wrapper">
      <canvas #canvas></canvas>
    </div>

    <app-navbar></app-navbar>
    <app-slider *ngIf="showSlider"></app-slider>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  showSlider = true;
  private ctx!: CanvasRenderingContext2D;
  private width!: number;
  private height!: number;

  private points: Point[] = [];
  private animationFrameId: any;
  private mouseX = -1000;
  private mouseY = -1000;

  constructor(private renderer: Renderer2, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.showSlider = !(url === '/login' || url === '/register'|| url.startsWith('/reservation')|| url.startsWith('/admin-dashboard') );
      }
    });
  }

  ngAfterViewInit() {
    this.setupCanvas();
    this.initPoints(70);
    this.animate();

    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private setupCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private onResize = () => {
    this.resizeCanvas();
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;
  }

  private onMouseMove = (event: MouseEvent) => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };

  private initPoints(count: number) {
    this.points = [];
    for (let i = 0; i < count; i++) {
      this.points.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
      });
    }
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.movePoints();
    this.drawPoints();
    this.drawLines();
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private movePoints() {
    for (const p of this.points) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;
    }
  }

  private drawPoints() {
    this.ctx.fillStyle = 'rgba(100, 149, 237, 0.7)';
    for (const p of this.points) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawLines() {
    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) {
        const p1 = this.points[i];
        const p2 = this.points[j];
        const dist = this.distance(p1, p2);

        if (dist < 140) {
          const distToMouse1 = this.distanceToMouse(p1);
          const distToMouse2 = this.distanceToMouse(p2);

          if (distToMouse1 < 150 || distToMouse2 < 150) {
            const alpha = 1 - dist / 140;
            this.ctx.strokeStyle = `rgba(100, 149, 237, ${alpha * 0.8})`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
          }
        }
      }
    }
  }

  private distance(p1: Point, p2: Point): number {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y);
  }

  private distanceToMouse(p: Point): number {
    return Math.hypot(p.x - this.mouseX, p.y - this.mouseY);
  }
}

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}
