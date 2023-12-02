import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../interfaces/task.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private readonly _http: HttpClient) {}

    public getTasks(): Observable<ITask[]> {
        return this._http.get<ITask[]>(environment.backend);
    }
}

