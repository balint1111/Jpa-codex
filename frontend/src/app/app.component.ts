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
        <button mat-button *ngIf="auth.user" [matMenuTriggerFor]="userMenu">{{ auth.user.username }}</button>
        <mat-menu #userMenu="matMenu">
          <div mat-menu-item>
            <mat-form-field appearance="fill" class="lang-select m-0">
              <mat-select [value]="currentLang" (selectionChange)="setLang($event.value)">
                <mat-option value="en">EN</mat-option>
                <mat-option value="hu">HU</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
          <div mat-menu-item>
            <mat-slide-toggle [checked]="dark" (change)="toggleDark()">{{ t('dark_mode') }}</mat-slide-toggle>
          </div>
          <button mat-menu-item (click)="logout()">{{ t('logout') }}</button>
        </mat-menu>
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
