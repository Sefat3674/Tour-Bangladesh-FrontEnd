import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="stat-card">
      <div class="stat-num">{{ value }}<span>{{ suffix }}</span></div>
      <div class="stat-label">{{ label }}</div>
      <div class="stat-change" *ngIf="change">{{ change }}</div>
    </div>
  `,
  styles: [\`
    .stat-card { background:var(--card); border:1px solid var(--border); padding:24px; text-align:center; }
    .stat-num { font-family:'Cormorant Garamond',serif; font-size:44px; font-weight:300; color:var(--white); line-height:1; }
    .stat-num span { color:var(--gold); }
    .stat-label { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:var(--muted); margin-top:6px; }
    .stat-change { font-size:12px; color:var(--success); margin-top:4px; }
  \`]
})
export class StatCardComponent {
  @Input() value  = '';
  @Input() suffix = '';
  @Input() label  = '';
  @Input() change = '';
}
