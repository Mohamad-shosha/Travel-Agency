import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
  , styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  reservations: any[] = [];
  cancelledReservations: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchReservations();
    this.fetchCancelledReservations();
  }

  fetchUsers() {
    this.adminService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: number) {
    this.adminService.deleteUser(id).subscribe(() => {
      this.fetchUsers();
    });
  }

  changeRole(id: number, role: string) {
    this.adminService.changeUserRole(id, role).subscribe(() => {
      this.fetchUsers();
    });
  }

  fetchReservations() {
    this.adminService.getAllReservations().subscribe(data => {
      this.reservations = data;
    });
  }

  fetchCancelledReservations() {
    this.adminService.getCancelledReservations().subscribe(data => {
      this.cancelledReservations = data;
    });
  }
}
