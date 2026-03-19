import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Tour } from '../../models/tour.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private http = inject(HttpClient);
  private api  = `${environment.apiUrl}/api/wishlist`;
  wishlistedIds = signal<number[]>([]);

  getMyWishlist()       { return this.http.get<Tour[]>(`${this.api}/my`); }
  add(id: number)       { this.wishlistedIds.update(ids => [...ids, id]); return this.http.post(`${this.api}/${id}`, {}); }
  remove(id: number)    { this.wishlistedIds.update(ids => ids.filter(x => x !== id)); return this.http.delete(`${this.api}/${id}`); }
  isWishlisted(id: number) { return this.wishlistedIds().includes(id); }
  toggle(id: number)    { return this.isWishlisted(id) ? this.remove(id) : this.add(id); }
}
