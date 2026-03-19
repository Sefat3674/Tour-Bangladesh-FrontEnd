import { Component, HostListener, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isScrolled  = false;
  mobileOpen  = false;
  authService = inject(AuthService);
  user        = this.authService.currentUser;

  @HostListener('window:scroll')
  onScroll() { this.isScrolled = window.scrollY > 60; }

  logout() { this.authService.logout(); }

  get dashRoute(): string {
    const r = this.authService.getRole();
    if (r === 'Agency') return '/agency/dashboard';
    if (r === 'Admin')  return '/admin/dashboard';
    return '/traveler/dashboard';
  }
}
