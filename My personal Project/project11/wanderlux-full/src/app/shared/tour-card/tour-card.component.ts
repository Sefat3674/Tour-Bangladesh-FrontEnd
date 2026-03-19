import { Component, Input, signal, inject } from '@angular/core';
import { NgIf, NgClass, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Tour } from '../../models/tour.model';
import { WishlistService } from '../../core/services/wishlist.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-tour-card',
  standalone: true,
  imports: [NgIf, NgClass, DecimalPipe],
  templateUrl: './tour-card.component.html',
  styleUrl: './tour-card.component.scss'
})
export class TourCardComponent {
  @Input({ required: true }) tour!: Tour;
  isWishlisted = signal(false);
  private router  = inject(Router);
  private wl      = inject(WishlistService);
  private auth    = inject(AuthService);

  openDetail()      { this.router.navigate(['/tours', this.tour.id]); }
  book(e: Event)    { e.stopPropagation(); this.router.navigate(['/booking', this.tour.id]); }

  toggleWishlist(e: Event) {
    e.stopPropagation();
    if (!this.auth.isLoggedIn()) { this.router.navigate(['/auth/login']); return; }
    this.isWishlisted.update(v => !v);
    this.wl.toggle(this.tour.id).subscribe();
  }

  get badgeClass(): string {
    const l = this.tour.badgeLabel?.toLowerCase() ?? '';
    if (l === 'hot')     return 'hot';
    if (l === 'new')     return 'new';
    if (l === 'premium') return 'premium';
    return 'gold';
  }
}
