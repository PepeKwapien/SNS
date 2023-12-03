import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private _closeDialogEventEmitter: EventEmitter<void>;

    constructor() {
        this._closeDialogEventEmitter = new EventEmitter();
    }

    public get closeDialogEventEmitter(): EventEmitter<void> {
        return this._closeDialogEventEmitter;
    }

    public closeDialog() {
        this._closeDialogEventEmitter.emit();
    }
}

