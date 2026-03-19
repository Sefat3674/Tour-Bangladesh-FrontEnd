import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb   = inject(FormBuilder);
  private auth = inject(AuthService);
  private rtr  = inject(Router);
  isLoading = false;
  error     = '';

  form = this.fb.group({
    fullName:    ['', [Validators.required, Validators.minLength(3)]],
    email:       ['', [Validators.required, Validators.email]],
    password:    ['', [Validators.required, Validators.minLength(8)]],
    phoneNumber: [''],
    role:        ['Traveler']
  });

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true; this.error = '';
    this.auth.register(this.form.value as any).subscribe({
      next: () => this.rtr.navigate(['/traveler/dashboard']),
      error: err => { this.error = err.error?.message || 'Registration failed.'; this.isLoading = false; }
    });
  }
}
