import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.userApiUrl}/users`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.userApiUrl}/users/${id}`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.userApiUrl}/users/${id}`);
  }

  getRoles(): Observable<{ name: string }[]> {
    return this.http.get<{ name: string }[]>(`${environment.userApiUrl}/roles`);
  }

  updateRoles(id: string, roles: string[]) {
    return this.http.put<User>(`${environment.userApiUrl}/users/${id}/roles`, { roles });
  }
}
