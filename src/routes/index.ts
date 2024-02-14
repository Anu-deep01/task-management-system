// src/api/routes/task.ts

import express from 'express';
import { createTask, updateTask, deleteTask, getAllTasks } from '../controllers/task';

const router = express.Router();

router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/', getAllTasks);

export default router;
