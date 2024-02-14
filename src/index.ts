// src/index.ts

import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './middleware/auth';
import taskRoutes from './routes/task';
import authRoutes from './routes/auth';
import { handleWebSocket } from './websocket/websocket';
import { RequestHandlerParams } from 'express-serve-static-core';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/task_manager',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


// Body parser middleware
app.use(bodyParser.json());

// Routes
app.use('/api/task', authMiddleware as RequestHandlerParams, taskRoutes);
app.use('/api/auth', authRoutes);

// WebSocket
wss.on('connection', handleWebSocket);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
