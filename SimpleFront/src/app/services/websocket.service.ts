import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    constructor(private socket: Socket) {}

    connect() {
        this.socket.connect();
    }

    onUpdate(callback: (data: any) => void) {
        this.socket.on('update', callback);
    }
}

