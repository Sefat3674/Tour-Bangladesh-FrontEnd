import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../../core/services/booking.service';
import { AuthService } from '../../../core/services/auth.service';
import { Booking } from '../../../models/booking.model';

@Component({
  selector: 'app-agency-dashboard',
  standalone: true,
  imports: [ NgIf, RouterLink],
  templateUrl: './agency-dashboard.component.html',
  styleUrl: './agency-dashboard.component.scss'
})
export class AgencyDashboardComponent implements OnInit {

  bookings: Booking[] = [];
  isLoading = true;
  revenue = 0;
  avgRating = 4.9; // static for now (can be dynamic later)

  user = inject(AuthService).currentUser;
  private svc = inject(BookingService);

  ngOnInit(): void {
    this.loadBookings();
  }

  private loadBookings(): void {
    this.svc.getAgencyBookings().subscribe({
      next: (b) => {
        this.bookings = b || [];
        this.calculateRevenue();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
        this.isLoading = false;
      }
    });
  }

  private calculateRevenue(): void {
    this.revenue = this.bookings.reduce(
      (sum, booking) => sum + (booking.totalAmount || 0),
      0
    );
  }
}