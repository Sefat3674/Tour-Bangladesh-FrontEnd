import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './forgotPassWord.component.html',
  styleUrl: './forgotPassWord.component.scss'
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  isLoading = false;
  successMsg = '';
  errorMsg = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.successMsg = '';
    this.errorMsg = '';

    this.http.post(`${environment.apiUrl}/auth/forgot-password`, this.form.value)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.successMsg = 'If email exists, reset link sent. Check your inbox.';
        },
        error: err => {
          this.isLoading = false;
          this.errorMsg = err.error?.message || 'Something went wrong.';
        }
      });
  }
}