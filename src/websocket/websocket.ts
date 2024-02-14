// src/websockets/websocket.ts

import WebSocket from 'ws';

let clients: WebSocket[] = [];

export const handleWebSocket = (ws: WebSocket) => {
    clients.push(ws);

    ws.on('message', (message: string) => {
        console.log(`Received message: ${message}`);
    });

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
    });
};

export const notifyClients = (event: string, data: any) => {
    clients.forEach(client => {
        client.send(JSON.stringify({ event, data }));
    });
};
