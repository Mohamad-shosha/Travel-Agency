import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { LandingComponent } from './landing/landing.component';
import { TripsComponent } from './trips/trips.component';
import { ReservationComponent } from './reservation/reservation.component'; 
import { ReservationsComponent } from './reservations/reservations.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ServicesComponent } from './services/services.component';  

const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'services', component: ServicesComponent },
  { path: 'trips', component: TripsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation/:id', component: ReservationComponent } ,
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'reservations', component: ReservationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
