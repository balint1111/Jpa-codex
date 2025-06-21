import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TaskService, Task } from '../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  template: `
    <h2>Tasks</h2>
    <button mat-raised-button color="primary" (click)="newTask()">New Task</button>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 w-100 mt-2">
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef>Description</th>
        <td mat-cell *matCellDef="let t">{{ t.description }}</td>
      </ng-container>
      <ng-container matColumnDef="completed">
        <th mat-header-cell *matHeaderCellDef>Completed</th>
        <td mat-cell *matCellDef="let t">{{ t.completed }}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let t">
          <button mat-button (click)="edit(t)">Edit</button>
          <button mat-button color="warn" (click)="delete(t)">Delete</button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <mat-paginator [pageSize]="5"></mat-paginator>
  `
})
export class TasksComponent implements OnInit {
  displayedColumns = ['description', 'completed', 'actions'];
  dataSource = new MatTableDataSource<Task>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tasks: TaskService, private router: Router) {}

  ngOnInit() { this.load(); }

  ngAfterViewInit() { this.dataSource.paginator = this.paginator; }

  load() { this.tasks.getTasks().subscribe(t => this.dataSource.data = t); }

  delete(task: Task) {
    if (task.id) {
      this.tasks.delete(task.id).subscribe(() => this.load());
    }
  }

  edit(task: Task) {
    if (task.id) {
      this.router.navigate(['/tasks', task.id]);
    }
  }

  newTask() { this.router.navigate(['/tasks', 'new']); }
}
