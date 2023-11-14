import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: String,
    dueDate: { type: Date, require: true },
    overdueNoticeSent: { type: Boolean, default: false }
});

export const Tasks = mongoose.model('Task', taskSchema);
