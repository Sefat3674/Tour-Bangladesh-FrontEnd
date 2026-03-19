import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking } from '../../../models/booking.model';

@Component({
  selector: 'app-traveler-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, DatePipe, DecimalPipe, RouterLink],
  templateUrl: './traveler-dashboard.component.html',
  styleUrl: './traveler-dashboard.component.scss'
})
export class TravelerDashboardComponent implements OnInit {
  bookings: Booking[] = [];
  isLoading = true;
  user = inject(AuthService).currentUser;
  private svc = inject(BookingService);

  ngOnInit() {
    this.svc.getMyBookings().subscribe({
      next: b => { this.bookings = b; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  get confirmedCount(): number {
    return this.bookings.filter(b => b.status === 'Confirmed').length;
  }

  get completedCount(): number {
    return this.bookings.filter(b => b.status === 'Completed').length;
  }

  badgeClass(s: string): string {
    const map: Record<string, string> = {
      'Pending':   'badge-warning',
      'Confirmed': 'badge-success',
      'Cancelled': 'badge-danger',
      'Completed': 'badge-muted'
    };
    return map[s] ?? 'badge-muted';
  }
}
