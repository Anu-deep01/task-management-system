// src/controllers/task.ts

import { Request, Response } from 'express';
import Task from '../models/Task';
import { notifyClients } from '../websocket/websocket';

interface AuthenticatedRequest extends Request {
    user: { id: string };
}

export const createTask = async (req: any, res: any) => {
    try {
        const task = new Task({ ...req.body, user: req.user.id });
        await task.save();

        // Notify clients about the new task
        notifyClients('task_created', task);

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
            return res.status(404).json({ message: 'Task not found', status: 404 });
        }

        // Update task status
        task.status = status;

        // Notify clients about the updated task
        notifyClients('task_updated', task);

        // Save the updated task
        const updatedTask = await task.save();

        res.json(updatedTask);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error', status: 500 });
    }
};

// Delete a task
export const deleteTask = async (req: any, res: any) => {
    try {
        const taskId = req.params.id;

        // Find the task by id and delete it
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(404).json({ message: 'Task not found', status: 404 });
        }

        // Notify clients about the deleted task
        notifyClients('task_deleted', task);

        res.json({ message: 'Task deleted successfully', status: 200 });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error', status: 500 });
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
        res.status(500).json({ message: 'Server Error', status: 500 });
    }
};
