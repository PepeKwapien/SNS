import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ITask } from 'src/app/interfaces/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
    public tasks$: Observable<ITask[]> | undefined;
    private _subscription: Subscription;

    constructor(private readonly _taskService: TaskService) {
        this._subscription = this._taskService.taskAdded$.subscribe({ next: () => this._getTasks() });
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    ngOnInit() {
        this._getTasks();
    }

    public clearForm() {
        this._taskService.clearForm();
    }

    public calculateExpired(dueDate: Date): boolean {
        return new Date(dueDate) < new Date();
    }

    private _getTasks() {
        this.tasks$ = this._taskService.getTasks();
    }
}

