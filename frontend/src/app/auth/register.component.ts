import { Component } from '@angular/core';
import { TranslateService } from '../i18n/translate.service';

@Component({
  selector: 'app-register',
  template: `
  <h2>{{ t('register') }}</h2>
  <form>
    <input placeholder="Username" name="username">
    <input type="password" placeholder="Password" name="password">
    <button>{{ t('register') }}</button>
  </form>
  `
})
export class RegisterComponent {
  constructor(private translate: TranslateService) {}
  t(key: string) { return this.translate.t(key); }
}
