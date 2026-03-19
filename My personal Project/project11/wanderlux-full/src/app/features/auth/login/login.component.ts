import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb   = inject(FormBuilder);
  private auth = inject(AuthService);
  private rtr  = inject(Router);
  isLoading = false;
  error     = '';

  form = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true; this.error = '';
    this.auth.login(this.form.value as any).subscribe({
      next: res => {
        const r = res.user.role;
        if (r === 'Agency') this.rtr.navigate(['/agency/dashboard']);
        else if (r === 'Admin') this.rtr.navigate(['/admin/dashboard']);
        else this.rtr.navigate(['/traveler/dashboard']);
      },
      error: err => { this.error = err.error?.message || 'Invalid credentials.'; this.isLoading = false; }
    });
  }
}
