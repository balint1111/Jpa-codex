import { Component } from '@angular/core';
import { TranslateService } from '../i18n/translate.service';

@Component({
  selector: 'app-login',
  template: `
  <h2>{{ t('login') }}</h2>
  <form>
    <input placeholder="Username" name="username">
    <input type="password" placeholder="Password" name="password">
    <button>{{ t('login') }}</button>
  </form>
  `
})
export class LoginComponent {
  constructor(private translate: TranslateService) {}
  t(key: string) { return this.translate.t(key); }
}
