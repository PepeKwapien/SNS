import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-modal-button',
    templateUrl: './modal-button.component.html',
    styleUrls: ['./modal-button.component.scss']
})
export class ModalButtonComponent {
    @ViewChild('dialog') dialogElement!: ElementRef<HTMLDialogElement>;

    constructor() {}

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
}

