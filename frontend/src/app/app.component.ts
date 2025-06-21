import { Component } from '@angular/core';
import { TranslateService } from './i18n/translate.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
  <mat-sidenav-container>
    <mat-sidenav #drawer mode="side" [opened]="auth.user">
      <mat-nav-list>
        <a mat-list-item routerLink="/dashboard">Dashboard</a>
        <a mat-list-item routerLink="/users" *ngIf="hasRole('ADMIN')">Users</a>
        <a mat-list-item routerLink="/tasks">Tasks</a>
      </mat-nav-list>
    </mat-sidenav>
    <mat-sidenav-content>
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="drawer.toggle()" *ngIf="auth.user">
          <mat-icon>menu</mat-icon>
        </button>
        <span class="flex"></span>
        <span *ngIf="auth.user" class="mr-2">{{ auth.user.username }}</span>
        <button mat-button (click)="logout()" *ngIf="auth.user">Logout</button>
        <button mat-button (click)="setLang('en')">EN</button>
        <button mat-button (click)="setLang('hu')">HU</button>
        <mat-slide-toggle (change)="toggleDark()">Dark</mat-slide-toggle>
      </mat-toolbar>
      <div class="p-4">
        <router-outlet></router-outlet>
      </div>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `
})

export class AppComponent {
  dark = false;
  constructor(public auth: AuthService, private translate: TranslateService) {}

  toggleDark() {
    this.dark = !this.dark;
    document.body.classList.toggle('dark', this.dark);
  }

  setLang(lang: 'en' | 'hu') {
    this.translate.setLang(lang);
  }

  logout() {
    this.auth.logout();
  }

  hasRole(role: string) {
    return this.auth.user?.roles.some(r => r.name === role);
  }
}
