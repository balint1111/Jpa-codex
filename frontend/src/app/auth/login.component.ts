import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '../i18n/translate.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
  <mat-card>
    <h2>{{ t('login') }}</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Username</mat-label>
        <input matInput formControlName="username" />
      </mat-form-field>
      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" />
      </mat-form-field>
      <button mat-raised-button color="primary">{{ t('login') }}</button>
    </form>
    <button mat-button (click)="router.navigate(['/register'])">
      {{ t('register') }}
    </button>
    <p *ngIf="error" class="error">{{ error }}</p>
  </mat-card>
  `
})
export class LoginComponent {
  error = '';
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private auth: AuthService,
    private translate: TranslateService
  ) {}

  t(key: string) { return this.translate.t(key); }

  submit() {
    const { username, password } = this.form.value;
    if (username && password) {
      this.auth.login(username, password).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => this.error = 'Login failed'
      });
    }
  }
}
