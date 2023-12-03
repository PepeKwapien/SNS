import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
    public formGroup: FormGroup;

    constructor(private readonly _taskService: TaskService, private readonly _modalService: ModalService) {
        this.formGroup = this._taskService.formGroup;
    }

    public submit() {
        this._taskService.submit().subscribe({ next: () => {} });
        this._modalService.closeDialog();
    }
}

