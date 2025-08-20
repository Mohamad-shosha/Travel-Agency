import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  reservations: any[] = [];
  cancelledReservations: any[] = [];

  cancellationReasons: string[] = [
    'PERSONAL_ISSUE',
    'ILLNESS',
    'WEATHER_CONDITIONS',
    'SCHEDULE_CONFLICT',
    'TRANSPORTATION_ISSUE',
    'FOUND_BETTER_DEAL',
    'TRAVEL_RESTRICTIONS',
    'BOOKING_MISTAKE',
    'FINANCIAL_ISSUES',
    'OTHER'
  ];

  selectedReservationId: number | null = null;
  selectedReason: string = '';
  customReason: string = '';

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

deleteUser(email: string) {
  Swal.fire({
    title: 'Are you sure?',
    text: `You are about to delete the user: ${email}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
    width: window.innerWidth < 600 ? '70%' : '350px',
  }).then((result) => {
    if (result.isConfirmed) {
      this.adminService.deleteUser(email).subscribe({
        next: (message: string) => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: message || 'User has been deleted successfully',
            timer: 2500,
            showConfirmButton: false,
            timerProgressBar: true,
            width: window.innerWidth < 600 ? '65%' : '300px',
          });
          this.fetchUsers();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err?.error || 'Failed to delete the user',
            width: window.innerWidth < 600 ? '65%' : '300px',
          });
        }
      });
    }
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

  openCancelModal(reservationId: number) {
    this.selectedReservationId = reservationId;
    this.selectedReason = '';
    this.customReason = '';
  }

  confirmCancellation() {
    if (!this.selectedReservationId) {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'No reservation selected',
        width: window.innerWidth < 600 ? '65%' : '300px',
      });
      return;
    }

    const reasonToSend = this.selectedReason === 'OTHER' ? this.customReason.trim() : this.selectedReason;

    if (!reasonToSend) {
      Swal.fire({
        icon: 'warning',
        title: 'Alert',
        text: 'Please select or enter a cancellation reason',
        width: window.innerWidth < 600 ? '65%' : '300px',
      });
      return;
    }

    this.adminService.cancelReservation(this.selectedReservationId, reasonToSend).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Cancelled',
          text: 'Reservation cancelled successfully',
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true,
          width: window.innerWidth < 600 ? '65%' : '300px',
        });
        this.selectedReservationId = null;
        this.fetchReservations();
        this.fetchCancelledReservations();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to cancel reservation',
          width: window.innerWidth < 600 ? '65%' : '300px',
        });
      }
    });
  }

  closeCancelModal() {
    this.selectedReservationId = null;
  }
}
