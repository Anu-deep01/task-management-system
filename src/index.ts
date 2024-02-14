// src/index.ts

import express from 'express';
import http from 'http';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import { authMiddleware } from './middleware/auth';
import taskRoutes from './routes/task';
import authRoutes from './routes/auth';
import { RequestHandlerParams } from 'express-serve-static-core';
import { Server as SocketIOServer } from 'socket.io';
import { initializeWebSocket } from './websocket/websocket';
import { rateLimitMiddleware } from "./middleware/rateLimitMiddleware";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


// Body parser middleware
app.use(bodyParser.json());
app.use(rateLimitMiddleware);

initializeWebSocket(server);

// Routes
app.use('/api/task', authMiddleware as RequestHandlerParams, taskRoutes);
app.use('/api/auth', authRoutes);

// Socket.io event handling
io.on('connection', (socket: any) => {
    console.log('A user connected');

    // Handle when a client sends a message
    socket.on('message', (message: any) => {
        console.log('Message received:', message);
        // Broadcast the message to all connected clients
        io.emit('message', message);
    });

    // Handle when a user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
