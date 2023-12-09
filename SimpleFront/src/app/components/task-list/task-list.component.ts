import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/interfaces/task.interface';
import { TaskService } from 'src/app/services/task.service';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
    public tasks$: Observable<ITask[]> | undefined;

    constructor(private readonly _taskService: TaskService) {}

    ngOnInit() {
        this.tasks$ = this._taskService.getTasks();
    }

    public clearForm() {
        this._taskService.clearForm();
    }
}

