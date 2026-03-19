import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  token = this.route.snapshot.queryParamMap.get('token') || '';
  isLoading = false;
  successMsg = '';
  errorMsg = '';

  form = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.form.invalid) return;

    const { newPassword, confirmPassword } = this.form.value;
    if (newPassword !== confirmPassword) {
      this.errorMsg = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.http.post(`${environment.apiUrl}/auth/reset-password`, { token: this.token, newPassword })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.successMsg = 'Password reset successful! Redirecting to login...';
          setTimeout(() => this.router.navigate(['/auth/login']), 2000);
        },
        error: err => {
          this.isLoading = false;
          this.errorMsg = err.error?.message || 'Invalid or expired token';
        }
      });
  }
}