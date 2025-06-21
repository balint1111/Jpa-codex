import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private lang: 'en' | 'hu' = 'en';
  private messages: Record<string, any> = {
    en: { login: 'Login', register: 'Register' },
    hu: { login: 'Bejelentkezés', register: 'Regisztráció' }
  };

  setLang(lang: 'en' | 'hu') {
    this.lang = lang;
  }

  t(key: string): string {
    return this.messages[this.lang][key] || key;
  }
}
