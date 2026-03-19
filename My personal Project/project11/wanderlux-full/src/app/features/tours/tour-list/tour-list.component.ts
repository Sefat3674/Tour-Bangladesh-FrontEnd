import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TourService } from '../../../core/services/tour.service';
import { TourCardComponent } from '../../../shared/tour-card/tour-card.component';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { Tour } from '../../../models/tour.model';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, TourCardComponent, LoaderComponent],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.scss'
})
export class TourListComponent implements OnInit {
  tours: Tour[]  = [];
  isLoading      = true;
  active         = 'All';
  categories     = ['All','Adventure','Honeymoon','Family','Beach','Cultural','Pilgrimage'];
  sortBy         = 'newest';
  maxPrice       = 10000;
  private svc    = inject(TourService);

  ngOnInit() { this.load(); }

  load() {
    this.isLoading = true;
    this.svc.getAll({
      category: this.active !== 'All' ? this.active : undefined,
      maxPrice: this.maxPrice,
      sortBy: this.sortBy
    }).subscribe({
      next: t => { this.tours = t; this.isLoading = false; },
      error: () => { this.isLoading = false; }
    });
  }

  setCategory(c: string) { this.active = c; this.load(); }
}
