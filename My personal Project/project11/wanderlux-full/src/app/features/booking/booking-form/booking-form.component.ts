import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, DecimalPipe } from '@angular/common';
import { TourService } from '../../../core/services/tour.service';
import { BookingService } from '../../../core/services/booking.service';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { Tour } from '../../../models/tour.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, DecimalPipe, LoaderComponent],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent implements OnInit {
  private fb      = inject(FormBuilder);
  private route   = inject(ActivatedRoute);
  private router  = inject(Router);
  private tourSvc = inject(TourService);
  private bookSvc = inject(BookingService);

  tour: Tour | null = null;
  isLoading  = false;
  totalPrice = 0;

  form = this.fb.group({
    travelDate:     ['', Validators.required],
    numTravelers:   [1, [Validators.required, Validators.min(1)]],
    specialRequest: ['']
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('tourId');
    if (id) {
      this.tourSvc.getById(+id).subscribe(t => { this.tour = t; this.calc(); });
    }
    this.form.get('numTravelers')?.valueChanges.subscribe(() => this.calc());
  }

  calc() {
    if (!this.tour) return;
    this.totalPrice = this.tour.price * (this.form.get('numTravelers')?.value || 1);
  }

  onSubmit() {
    if (this.form.invalid || !this.tour) return;
    this.isLoading = true;
    this.bookSvc.create({
      tourId: this.tour.id,
      travelDate: this.form.value.travelDate!,
      numTravelers: this.form.value.numTravelers!,
      specialRequest: this.form.value.specialRequest || undefined
    }).subscribe({
      next: b  => this.router.navigate(['/booking/success'], { queryParams: { ref: b.bookingRef } }),
      error: () => { this.isLoading = false; }
    });
  }
}
