import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = this.auth.authHeader;
    if (authHeader) {
      const authReq = req.clone({ setHeaders: { Authorization: authHeader } });
      return next.handle(authReq).pipe(
        catchError(err => this.handleError(err))
      );
    }
    return next.handle(req).pipe(
      catchError(err => this.handleError(err))
    );
  }

  private handleError(err: any): Observable<HttpEvent<any>> {
    if (err instanceof HttpErrorResponse && err.status === 401) {
      this.auth.logout();
      this.router.navigate(['/login']);
    }
    return throwError(() => err);
  }
}
