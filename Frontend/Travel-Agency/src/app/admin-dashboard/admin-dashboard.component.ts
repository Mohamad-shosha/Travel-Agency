import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  reservations: any[] = [];
  cancelledReservations: any[] = [];

  // المتغيرات الخاصة بعملية الإلغاء مع السبب
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

  // فتح مودال سبب الإلغاء مع تخزين id الحجز المختار
  openCancelModal(reservationId: number) {
    this.selectedReservationId = reservationId;
    this.selectedReason = '';
    this.customReason = '';
  }

  // إرسال سبب الإلغاء وتأكيد الإلغاء
  confirmCancellation() {
    if (!this.selectedReservationId) {
      alert('No reservation selected');
      return;
    }

    const reasonToSend = this.selectedReason === 'OTHER' ? this.customReason.trim() : this.selectedReason;

    if (!reasonToSend) {
      alert('Please select or enter a cancellation reason');
      return;
    }

    this.adminService.cancelReservation(this.selectedReservationId, reasonToSend).subscribe(() => {
      alert('Reservation cancelled successfully');
      this.selectedReservationId = null;
      this.fetchReservations();
      this.fetchCancelledReservations();
    }, error => {
      alert('Failed to cancel reservation');
      console.error(error);
    });
  }

  // إغلاق مودال سبب الإلغاء
  closeCancelModal() {
    this.selectedReservationId = null;
  }
}
