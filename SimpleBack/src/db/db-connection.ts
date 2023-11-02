import mongoose from 'mongoose';
import { taskModel } from './task.js';

export const dbConnection = async (mongoUri: string) => {
    const dbConnection: mongoose.Connection = mongoose.connection;

    dbConnection.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
    });

    dbConnection.once('open', async () => {
        console.log('Connected to MongoDB');

        const task = new taskModel({ title: 'Connecting Mongo', description: 'Trying it out', dueDate: Date.now() });
        await task.save();
        console.log('One entry added');
        console.log(await taskModel.find({}));
    });

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }

    return dbConnection;
};
