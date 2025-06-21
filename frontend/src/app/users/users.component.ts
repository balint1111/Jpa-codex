import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../services/user.service';
import { User } from '../services/auth.service';

@Component({
  selector: 'app-users',
  template: `
  <h2>Users</h2>
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8 w-100">
    <ng-container matColumnDef="username">
      <th mat-header-cell *matHeaderCellDef> Username </th>
      <td mat-cell *matCellDef="let user"> {{user.username}} </td>
    </ng-container>
    <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef> Actions </th>
      <td mat-cell *matCellDef="let user">
        <button mat-button color="warn" (click)="delete(user)">Delete</button>
      </td>
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
  <mat-paginator [pageSize]="5"></mat-paginator>
  `
})
export class UsersComponent implements OnInit {
  displayedColumns = ['username', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private users: UserService) {}

  ngOnInit() {
    this.load();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  load() {
    this.users.getUsers().subscribe(u => this.dataSource.data = u);
  }

  delete(user: User) {
    if (user.id) {
      this.users.deleteUser(user.id).subscribe(() => this.load());
    }
  }
}
