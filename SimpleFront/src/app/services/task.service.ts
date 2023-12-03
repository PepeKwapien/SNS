import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ITask } from '../interfaces/task.interface';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private _formGroup: FormGroup;

    constructor(private readonly _http: HttpClient, private readonly _formMaker: FormBuilder) {
        this._formGroup = this._formMaker.group({ title: [''], description: [''], dueDate: [new Date()] });
    }

    public get formGroup(): FormGroup {
        return this._formGroup;
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
        return this._http.post<void>(environment.backend, this._formGroup.value).pipe(
            catchError((error) => {
                console.log(`There was error: ${error}`);
                return EMPTY;
            })
        );
    }
}

