import { Routes } from '@angular/router';
import { authGuard }  from './core/guards/auth.guard';
import { roleGuard }  from './core/guards/role.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'tours',
    loadComponent: () => import('./features/tours/tour-list/tour-list.component').then(m => m.TourListComponent)
  },
  {
    path: 'tours/:id',
    loadComponent: () => import('./features/tours/tour-detail/tour-detail.component').then(m => m.TourDetailComponent)
  },
  {
    path: 'auth/login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'auth/register',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'auth/forgotPassWord',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/forgotPassWord/forgotPassWord.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'auth/reset-password',
    
    loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
    path: 'booking/:tourId',
    canActivate: [authGuard],
    loadComponent: () => import('./features/booking/booking-form/booking-form.component').then(m => m.BookingFormComponent)
  },
  {
    path: 'booking/success',
    canActivate: [authGuard],
    loadComponent: () => import('./features/booking/booking-success/booking-success.component').then(m => m.BookingSuccessComponent)
  },
  {
    path: 'traveler/dashboard',
    canActivate: [authGuard, roleGuard('Traveler')],
    loadComponent: () => import('./features/traveler/dashboard/traveler-dashboard.component').then(m => m.TravelerDashboardComponent)
  },
  {
    path: 'agency/dashboard',
    canActivate: [authGuard, roleGuard('Agency')],
    loadComponent: () => import('./features/agency/dashboard/agency-dashboard.component').then(m => m.AgencyDashboardComponent)
  },
  {
    path: 'admin/dashboard',
    canActivate: [authGuard, roleGuard('Admin')],
    loadComponent: () => import('./features/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  { path: '**', redirectTo: '' }
];
