import { AfterViewInit, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements AfterViewInit, OnDestroy {

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private animationId: number = 0;
  private width!: number;
  private height!: number;
  private points: Point[] = [];
  private numPoints: number = 60;

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('backgroundCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.setSize();
    window.addEventListener('resize', this.setSize.bind(this));
    this.createPoints();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.setSize.bind(this));
  }

  private setSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  private createPoints() {
    this.points = [];
    for(let i=0; i<this.numPoints; i++) {
      this.points.push(new Point(
        Math.random() * this.width,
        Math.random() * this.height,
        (Math.random() - 0.5) * 0.7,
        (Math.random() - 0.5) * 0.7
      ));
    }
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for(let i=0; i<this.points.length; i++) {
      let p = this.points[i];
      p.update(this.width, this.height);
      p.draw(this.ctx);

      for(let j=i+1; j<this.points.length; j++) {
        let p2 = this.points[j];
        let dist = p.distance(p2);
        if(dist < 130) {
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 130})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
    this.animationId = requestAnimationFrame(this.animate);
  }

}

class Point {
  constructor(
    public x: number,
    public y: number,
    public vx: number,
    public vy: number
  ) {}

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;
    if(this.x < 0 || this.x > width) this.vx = -this.vx;
    if(this.y < 0 || this.y > height) this.vy = -this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  distance(p: Point) {
    return Math.hypot(this.x - p.x, this.y - p.y);
  }
}
