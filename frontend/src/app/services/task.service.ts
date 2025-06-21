import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Task {
  id?: string;
  description: string;
  completed: boolean;
  userId?: string | null;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.tasksApiUrl}/tasks`);
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${environment.tasksApiUrl}/tasks/${id}`);
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.tasksApiUrl}/tasks`, task);
  }

  update(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.tasksApiUrl}/tasks/${id}`, task);
  }

  delete(id: string) {
    return this.http.delete(`${environment.tasksApiUrl}/tasks/${id}`);
  }
}
