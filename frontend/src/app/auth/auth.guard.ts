import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    if (this.auth.user) {
      return of(true);
    }
    if (this.auth.authHeader) {
      return this.auth.fetchMe().pipe(
        map(() => true),
        catchError(() => of(this.router.createUrlTree(['/login'])))
      );
    }
    return of(this.router.createUrlTree(['/login']));
  }
}
