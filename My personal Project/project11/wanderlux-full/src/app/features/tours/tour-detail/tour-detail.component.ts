import { Component, OnInit, inject } from '@angular/core';
import { NgIf, DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TourService } from '../../../core/services/tour.service';
import { LoaderComponent } from '../../../shared/loader/loader.component';
import { Tour } from '../../../models/tour.model';

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [NgIf, DecimalPipe, RouterLink, LoaderComponent],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.scss'
})
export class TourDetailComponent implements OnInit {
  tour: Tour | null = null;
  isLoading = true;
  private route = inject(ActivatedRoute);
  private svc   = inject(TourService);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.svc.getById(+id).subscribe({
        next: t  => { this.tour = t; this.isLoading = false; },
        error: () => { this.isLoading = false; }
      });
    }
  }
}
