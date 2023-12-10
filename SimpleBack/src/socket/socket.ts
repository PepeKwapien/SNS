import { Server } from 'socket.io';

let ioInstance: Server;

export const initializeSocket = (server: any) => {
    ioInstance = new Server(server, { cors: { origin: 'http://localhost:4200' } });

    ioInstance.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return ioInstance;
};

export const getSocketInstance = () => {
    if (!ioInstance) {
        throw new Error('Socket.IO instance has not been initialized');
    }
    return ioInstance;
};
