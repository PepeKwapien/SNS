import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: String,
    dueDate: { type: Date, require: true },
    reminderTime: Date
});

export const taskModel = mongoose.model('Task', taskSchema);
