import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
    selector: 'app-modal-button',
    templateUrl: './modal-button.component.html',
    styleUrls: ['./modal-button.component.scss']
})
export class ModalButtonComponent implements OnDestroy {
    @ViewChild('dialog') dialogElement!: ElementRef<HTMLDialogElement>;

    private _subscription: Subscription;

    constructor(private readonly _modalService: ModalService) {
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
        this.dialogElement.nativeElement.close();
    }

    public closeDialogEvent() {
        console.log('ayo');
        this.dialogElement.nativeElement.close();
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}

