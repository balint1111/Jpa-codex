import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private lang: 'en' | 'hu' = 'en';
  private messages: Record<string, any> = {
    en: { login: 'Login', register: 'Register', logout: 'Logout' },
    hu: { login: 'Bejelentkezés', register: 'Regisztráció', logout: 'Kijelentkezés' }
  };

  setLang(lang: 'en' | 'hu') {
    this.lang = lang;
  }

  get currentLang() {
    return this.lang;
  }

  t(key: string): string {
    return this.messages[this.lang][key] || key;
  }
}
