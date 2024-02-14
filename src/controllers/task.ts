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


// Update a task
export const updateTask = async (req: any, res: any) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;

        // Find the task by id
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update task status
        task.status = status;

        // Save the updated task
        const updatedTask = await task.save();

        res.json(updatedTask);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Delete a task
export const deleteTask = async (req: any, res: any) => {
    try {
        const taskId = req.params.id;

        // Find the task by id and delete it
        await Task.findByIdAndDelete(taskId);

        res.json({ message: 'Task deleted successfully' });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// Get all tasks
export const getAllTasks = async (req: any, res: any) => {
    try {
        // Retrieve all tasks associated with the authenticated user
        const tasks = await Task.find({ user: req.user.id });

        res.json(tasks);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
