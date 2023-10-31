import mongoose from 'mongoose';
import { taskModel } from './task.js';

export const dbConnection = async (mongoUri: string) => {
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }

    const dbConnection: mongoose.Connection = mongoose.connection;

    dbConnection.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
    });

    dbConnection.on('open', async () => {
        console.log('Connected to MongoDB');
        console.log(await dbConnection.db.listCollections());

        const task = new taskModel({ title: 'Connecting Mongo', description: 'Trying it out', dueDate: Date.now() });
        await task.save();
        console.log('One entry added');
        console.log(await taskModel.find({}));
    });

    return dbConnection;
};
