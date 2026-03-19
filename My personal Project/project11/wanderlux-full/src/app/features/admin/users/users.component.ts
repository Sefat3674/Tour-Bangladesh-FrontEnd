import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="section" style="padding-top:120px;text-align:center;min-height:100vh">
      <div class="section-tag" style="justify-content:center">Coming Soon</div>
      <h2 class="section-title">Manage Users <em>Page</em></h2>
      <p style="color:var(--muted);margin:16px auto 32px;max-width:400px">
        Connect to your .NET API to load real data here.
      </p>
      <a class="btn-outline" routerLink="/">Back Home</a>
    </div>
  `
})
export class AdminUsersComponent {}
