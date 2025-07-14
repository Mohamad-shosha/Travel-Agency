import { Component } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Travel-Agency';
  showSlider = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: RouterEvent) => {  // هنا استخدمت RouterEvent بدل NavigationEnd
      if (event instanceof NavigationEnd) {  // تأكدنا مرة أخرى من النوع
        const url = event.urlAfterRedirects;
        if (url === '/login' || url === '/register') {
          this.showSlider = false;
        } else {
          this.showSlider = true;
        }
      }
    });
  }
}
