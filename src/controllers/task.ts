// src/controllers/task.ts

import { Request, Response } from 'express';
import Task from '../models/Task';

// Define a custom interface that extends the Request interface
interface AuthenticatedRequest extends Request {
    user: { id: string }; // Modify this according to your user object structure
}

export const createTask = async (req: any, res: any) => {
    try {
        const task = new Task({ ...req.body, user: req.user.id });
        await task.save();
        res.status(201).json(task);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Implement other CRUD operations similarly

export const updateTask = async (req: Request, res: Response) => {
    // Your implementation here
};

export const deleteTask = async (req: Request, res: Response) => {
    // Your implementation here
};

export const getAllTasks = async (req: Request, res: Response) => {
    // Your implementation here
};
