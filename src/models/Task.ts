// src/models/Task.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description?: string;
    status: 'active' | 'completed';
    user: string;
}

const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<ITask>('Task', taskSchema);
