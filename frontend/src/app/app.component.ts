import { Component } from '@angular/core';
import { TranslateService } from './i18n/translate.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
  <mat-sidenav-container>
    <mat-sidenav #drawer mode="side" [opened]="auth.user">
      <mat-nav-list>
        <a mat-list-item routerLink="/dashboard" *ngIf="hasRole('DASHBOARD')">Dashboard</a>
        <a mat-list-item routerLink="/users" *ngIf="hasRole('DASHBOARD')">Users</a>
        <a mat-list-item routerLink="/tasks" *ngIf="hasRole('TASK')">Tasks</a>
      </mat-nav-list>
    </mat-sidenav>
    <mat-sidenav-content>
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="drawer.toggle()" *ngIf="auth.user">
          <mat-icon>menu</mat-icon>
        </button>
        <span class="flex"></span>
        <span *ngIf="auth.user" class="mr-2">{{ auth.user.username }}</span>
        <button mat-raised-button color="accent" (click)="logout()" *ngIf="auth.user">{{ t('logout') }}</button>
        <mat-form-field appearance="fill" class="lang-select">
          <mat-select [value]="currentLang" (selectionChange)="setLang($event.value)">
            <mat-option value="en">EN</mat-option>
            <mat-option value="hu">HU</mat-option>
          </mat-select>
        </mat-form-field>
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
  constructor(public auth: AuthService, private translate: TranslateService) {
    document.body.classList.add('light-theme');
  }

  get currentLang() {
    return this.translate.currentLang;
  }

  toggleDark() {
    this.dark = !this.dark;
    document.body.classList.toggle('dark-theme', this.dark);
    document.body.classList.toggle('light-theme', !this.dark);
  }

  setLang(lang: 'en' | 'hu') {
    this.translate.setLang(lang);
  }

  t(key: string) {
    return this.translate.t(key);
  }

  logout() {
    this.auth.logout();
  }

  hasRole(role: string) {
    return this.auth.user?.roles.some(r => r.name === role);
  }
}
