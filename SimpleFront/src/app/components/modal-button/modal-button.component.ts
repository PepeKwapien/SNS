import { Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-modal-button',
    templateUrl: './modal-button.component.html',
    styleUrls: ['./modal-button.component.scss']
})
export class ModalButtonComponent implements OnDestroy {
    @Output() closeDialogEvent: EventEmitter<void>;
    @ViewChild('dialog') dialogElement!: ElementRef<HTMLDialogElement>;

    private _subscription: Subscription;

    constructor(private readonly _modalService: ModalService) {
        this.closeDialogEvent = new EventEmitter();
        this._subscription = this._modalService.closeDialogEventEmitter.subscribe({ next: () => this.closeDialog() });
    }

    public closeOutsideDialog($event: MouseEvent) {
        const dialogDimensions = this.dialogElement.nativeElement.getBoundingClientRect();
        if (
            $event.clientX < dialogDimensions.left ||
            $event.clientX > dialogDimensions.right ||
            $event.clientY < dialogDimensions.top ||
            $event.clientY > dialogDimensions.bottom
        ) {
            this.closeDialog();
        }
    }

    public openDialog() {
        this.dialogElement.nativeElement.showModal();
    }

    public closeDialog() {
        this.closeDialogEvent.emit();
        this.dialogElement.nativeElement.close();
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}

