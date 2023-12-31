import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap } from 'rxjs';
import { ITask } from '../interfaces/task.interface';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private _formGroup: FormGroup;
    private _taskAdded$: Subject<void>;

    constructor(private readonly _http: HttpClient, private readonly _formMaker: FormBuilder) {
        this._formGroup = this._formMaker.group({
            title: ['', Validators.required],
            description: [''],
            dueDate: [new Date(), Validators.required]
        });

        this._taskAdded$ = new Subject();
    }

    public get formGroup(): FormGroup {
        return this._formGroup;
    }

    public get taskAdded$(): Subject<void> {
        return this._taskAdded$;
    }

    public getTasks(): Observable<ITask[]> {
        return this._http.get<ITask[]>(environment.backend).pipe(
            catchError((error) => {
                console.log(`There was error: ${error}`);
                return [];
            })
        );
    }

    public submit(): Observable<void> {
        const value: ITask = this._formGroup.value;
        const currentDate = new Date(value.dueDate);
        value.dueDate = new Date(currentDate.toISOString());

        const result = this._http.post<void>(environment.backend, value).pipe(
            catchError((error) => {
                console.log(`There was error: ${error}`);
                throw error;
            }),
            tap(() => this.clearForm()),
            tap(() => this._taskAdded$.next())
        );

        return result;
    }

    public clearForm(): void {
        const form = document.getElementById('taskFormGroup');
        form?.classList.remove('ng-submitted');
        this._formGroup.reset();
    }
}

