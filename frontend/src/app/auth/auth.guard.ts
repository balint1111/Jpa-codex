import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const roles = route.data['roles'] as string[] | undefined;

    const check = (): boolean | UrlTree => {
      if (!roles) {
        return true;
      }
      if (this.auth.user && roles.some(r => this.auth.user!.roles.some(role => role.name === r))) {
        return true;
      }
      return this.router.createUrlTree(['/login']);
    };

    if (this.auth.user) {
      return of(check());
    }
    if (this.auth.authHeader) {
      return this.auth.fetchMe().pipe(
        map(() => check()),
        catchError(() => of(this.router.createUrlTree(['/login'])))
      );
    }
    return of(this.router.createUrlTree(['/login']));
  }
}
