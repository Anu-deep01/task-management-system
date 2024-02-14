import { Server, Socket } from 'socket.io';

let io: Server;


export const initializeWebSocket = (server: any) => {
    try {
        io = require('socket.io')(server);

        io.on('connection', (socket: Socket) => {
            console.log('New client connected');

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    } catch (error) {
        console.error('Error initializing WebSocket:', error);
    }
};

export const notifyClients = (event: string, data: any) => {
    if (io) {
        io.emit(event, data);
        console.log(`Notification sent to all clients: ${event} -- ${JSON.stringify(data)}`);
    }
};
