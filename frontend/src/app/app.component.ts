import { Component } from '@angular/core';
import { TranslateService } from './i18n/translate.service';

@Component({
  selector: 'app-root',
  template: `
  <nav>
    <a routerLink="/dashboard">Dashboard</a> |
    <a routerLink="/users">Users</a> |
    <a routerLink="/tasks">Tasks</a>
    <button (click)="toggleDark()">Dark Mode</button>
    <button (click)="setLang('en')">EN</button>
    <button (click)="setLang('hu')">HU</button>
  </nav>
  <router-outlet></router-outlet>
  `
})

export class AppComponent {
  dark = false;
  constructor(private translate: TranslateService) {}

  toggleDark() {
    this.dark = !this.dark;
    document.body.classList.toggle('dark', this.dark);
  }

  setLang(lang: 'en' | 'hu') {
    this.translate.setLang(lang);
  }
}
