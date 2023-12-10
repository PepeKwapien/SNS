import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ModalButtonComponent } from './components/modal-button/modal-button.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
    declarations: [AppComponent, TaskListComponent, ModalButtonComponent, TaskFormComponent],
    imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, SocketIoModule.forRoot(config)],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
