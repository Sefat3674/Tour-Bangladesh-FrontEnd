import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="loader-wrap" *ngIf="show">
      <div class="spin"></div>
      <p *ngIf="message" class="msg">{{ message }}</p>
    </div>`,
  styles: [`.loader-wrap{display:flex;flex-direction:column;align-items:center;gap:12px;padding:48px}
    .spin{width:36px;height:36px;border:2px solid rgba(201,150,74,0.2);border-top-color:var(--gold);border-radius:50%;animation:spin .8s linear infinite}
    .msg{font-size:12px;color:var(--muted);letter-spacing:1px;text-transform:uppercase}
    @keyframes spin{to{transform:rotate(360deg)}}`]
})
export class LoaderComponent {
  @Input() show    = true;
  @Input() message = '';
}
