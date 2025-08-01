import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { LandingComponent } from './landing/landing.component';
import { TripsComponent } from './trips/trips.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';  // لو هتستخدم Toolbar في Navbar

// Forms & HTTP
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    TripsComponent,
    NavbarComponent,
    FooterComponent,
    SliderComponent,
    ReservationComponent,
    ReservationsComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Forms Modules
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,

    // Angular Material Modules
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
