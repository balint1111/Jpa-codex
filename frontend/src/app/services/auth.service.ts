import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
  id: string;
  username: string;
  roles: { name: string }[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: User | null = null;
  private credentials: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    const cred = localStorage.getItem('cred');
    if (cred) {
      this.credentials = cred;
    }
  }

  login(username: string, password: string) {
    this.credentials = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      Authorization: `Basic ${this.credentials}`
    });
    return this.http.get<User>(`${environment.userApiUrl}/me`, { headers }).pipe(
      tap(user => {
        this.currentUser = user;
        localStorage.setItem('cred', this.credentials!);
      })
    );
  }

  register(username: string, password: string) {
    return this.http.post<User>(`${environment.userApiUrl}/register`, { username, password });
  }

  logout() {
    this.credentials = null;
    this.currentUser = null;
    localStorage.removeItem('cred');
    this.router.navigate(['/login']);
  }

  fetchMe() {
    const headers = new HttpHeaders({
      Authorization: this.authHeader || ''
    });
    return this.http.get<User>(`${environment.userApiUrl}/me`, { headers }).pipe(
      tap(user => this.currentUser = user)
    );
  }

  get authHeader() {
    return this.credentials ? `Basic ${this.credentials}` : null;
  }

  get user() {
    return this.currentUser;
  }
}
