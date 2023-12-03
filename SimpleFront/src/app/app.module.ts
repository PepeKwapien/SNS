import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ModalButtonComponent } from './components/modal-button/modal-button.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

@NgModule({
    declarations: [AppComponent, TaskListComponent, ModalButtonComponent, TaskFormComponent],
    imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
