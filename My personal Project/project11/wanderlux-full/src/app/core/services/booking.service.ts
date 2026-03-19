import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Booking, CreateBookingDto } from '../../models/booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);
  private api  = `${environment.apiUrl}/api/bookings`;

  create(dto: CreateBookingDto)  { return this.http.post<Booking>(this.api, dto); }
  getMyBookings()                { return this.http.get<Booking[]>(`${this.api}/my`); }
  getById(id: number)            { return this.http.get<Booking>(`${this.api}/${id}`); }
  cancel(id: number)             { return this.http.put<Booking>(`${this.api}/${id}/cancel`, {}); }
  getAgencyBookings()            { return this.http.get<Booking[]>(`${this.api}/agency`); }
  confirm(id: number)            { return this.http.put<Booking>(`${this.api}/${id}/confirm`, {}); }
  downloadVoucher(id: number)    { return this.http.get(`${this.api}/${id}/voucher`, { responseType: 'blob' }); }
}
