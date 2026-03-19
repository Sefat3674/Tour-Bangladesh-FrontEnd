import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Tour, TourFilter, TourCategory } from '../../models/tour.model';

@Injectable({ providedIn: 'root' })
export class TourService {
  private http = inject(HttpClient);
  private api  = `${environment.apiUrl}/api/tours`;

  getAll(filter: TourFilter = {}) {
    let p = new HttpParams();
    if (filter.category && filter.category !== 'All') p = p.set('category',    filter.category);
    if (filter.destination) p = p.set('destination', filter.destination);
    if (filter.minPrice)    p = p.set('minPrice',    String(filter.minPrice));
    if (filter.maxPrice)    p = p.set('maxPrice',    String(filter.maxPrice));
    if (filter.sortBy)      p = p.set('sortBy',      filter.sortBy);
    if (filter.page)        p = p.set('page',        String(filter.page));
    return this.http.get<Tour[]>(this.api, { params: p });
  }

  getById(id: number)  { return this.http.get<Tour>(`${this.api}/${id}`); }
  getFeatured()        { return this.http.get<Tour[]>(`${this.api}/featured`); }
  getCategories()      { return this.http.get<TourCategory[]>(`${this.api}/categories`); }
  create(dto: Partial<Tour>)             { return this.http.post<Tour>(this.api, dto); }
  update(id: number, dto: Partial<Tour>) { return this.http.put<Tour>(`${this.api}/${id}`, dto); }
  delete(id: number)                     { return this.http.delete(`${this.api}/${id}`); }
}
