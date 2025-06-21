import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../services/auth.service';

@Component({
  selector: 'app-user-detail',
  template: `
    <mat-card>
      <h2>User Roles</h2>
      <form [formGroup]="form" (ngSubmit)="save()">
        <mat-selection-list formControlName="roles">
          <mat-list-option *ngFor="let role of roles" [value]="role.name">
            {{ role.name }}
          </mat-list-option>
        </mat-selection-list>
        <button mat-raised-button color="primary">Save</button>
      </form>
    </mat-card>
  `
})
export class UserDetailComponent implements OnInit {
  roles: { name: string }[] = [];
  form = this.fb.group({ roles: this.fb.control<string[]>([]) });
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private users: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.users.getUser(this.userId).subscribe(user => {
      this.form.patchValue({ roles: user.roles.map(r => r.name) });
    });
    this.users.getRoles().subscribe(r => this.roles = r);
  }

  save() {
    const roles = this.form.value.roles || [];
    this.users.updateRoles(this.userId, roles).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
