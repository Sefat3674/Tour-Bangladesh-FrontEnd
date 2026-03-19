import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, LoginDto, RegisterDto, AuthResponse } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http   = inject(HttpClient);
  private router = inject(Router);
  private api    = `${environment.apiUrl}/auth`;

  currentUser = signal<User | null>(this.loadUser());

  private loadUser(): User | null {
    const s = localStorage.getItem('wl_user');
    return s ? JSON.parse(s) : null;
  }

  login(dto: LoginDto) {
    return this.http.post<AuthResponse>(`${this.api}/login`, dto).pipe(
      tap(res => {
        localStorage.setItem('wl_token', res.token);
        localStorage.setItem('wl_user', JSON.stringify(res.user));
        this.currentUser.set(res.user);
      })
    );
  }

  register(dto: RegisterDto) {
    return this.http.post<AuthResponse>(`${this.api}/register`, dto).pipe(
      tap(res => {
        localStorage.setItem('wl_token', res.token);
        localStorage.setItem('wl_user', JSON.stringify(res.user));
        this.currentUser.set(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('wl_token');
    localStorage.removeItem('wl_user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null { return localStorage.getItem('wl_token'); }
  isLoggedIn(): boolean { return !!this.getToken(); }
  getRole(): string | null { return this.currentUser()?.role ?? null; }
  hasRole(role: string): boolean { return this.getRole() === role; }
}