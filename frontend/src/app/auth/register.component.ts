import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '../i18n/translate.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
  <mat-card>
    <h2>{{ t('register') }}</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Username</mat-label>
        <input matInput formControlName="username" />
      </mat-form-field>
      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" />
      </mat-form-field>
      <button mat-raised-button color="primary">{{ t('register') }}</button>
    </form>
    <button mat-button (click)="router.navigate(['/login'])">{{ t('login') }}</button>
    </mat-card>
  `
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private translate: TranslateService
  ) {}

  t(key: string) { return this.translate.t(key); }

  submit() {
    const { username, password } = this.form.value;
    if (username && password) {
      this.auth.register(username, password).subscribe(() => {
        this.router.navigate(['/login']);
      });
    }
  }
}
