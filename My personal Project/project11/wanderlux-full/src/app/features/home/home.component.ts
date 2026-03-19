import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TourService } from '../../core/services/tour.service';
import { TourCardComponent } from '../../shared/tour-card/tour-card.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Tour } from '../../models/tour.model'; // ✅ import Tour type

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    TourCardComponent,
    LoaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tours: Tour[] = [];  // ✅ explicitly typed
  isLoading = true;
  active = 'All';
  categories = ['All', 'Adventure', 'Honeymoon', 'Family', 'Beach', 'Cultural'];
  private svc = inject(TourService);

  ngOnInit() {
    this.load();
  }

  load() {
    this.isLoading = true;
    this.svc.getFeatured().subscribe({
      next: (t: Tour[]) => {
        this.tours = t;      // ✅ TypeScript knows this is Tour[]
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  setCategory(c: string) {
    this.active = c;
    this.isLoading = true;
    this.svc.getAll({ category: c !== 'All' ? c : undefined }).subscribe({
      next: (t: Tour[]) => {
        this.tours = t;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}