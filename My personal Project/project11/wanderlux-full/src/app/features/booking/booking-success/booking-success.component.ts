import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-booking-success',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './booking-success.component.html',
  styleUrl: './booking-success.component.scss'
})
export class BookingSuccessComponent implements OnInit {
  private route = inject(ActivatedRoute);
  ref = '';
  ngOnInit() { this.ref = this.route.snapshot.queryParams['ref'] || ''; }
}
