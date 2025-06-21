import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-task-detail',
  template: `
    <mat-card>
      <h2>Task</h2>
      <form [formGroup]="form" (ngSubmit)="save()">
        <mat-form-field appearance="fill" class="w-100">
          <mat-label>Description</mat-label>
          <input matInput formControlName="description" />
        </mat-form-field>
        <mat-checkbox formControlName="completed">Completed</mat-checkbox>
        <button mat-raised-button color="primary">Save</button>
      </form>
    </mat-card>
  `
})
export class TaskDetailComponent implements OnInit {
  form = this.fb.group({
    description: ['', Validators.required],
    completed: [false]
  });
  taskId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private tasks: TaskService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId && this.taskId !== 'new') {
      this.tasks.getTask(this.taskId).subscribe(t => this.form.patchValue(t));
    }
  }

  save() {
    const task: Task = this.form.value as Task;
    if (this.taskId && this.taskId !== 'new') {
      this.tasks.update(this.taskId, task).subscribe(() => this.router.navigate(['/tasks']));
    } else {
      this.tasks.create(task).subscribe(() => this.router.navigate(['/tasks']));
    }
  }
}
