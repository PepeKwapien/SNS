import Bull from 'bull';
import { taskModel } from '../db/task.js';
import dotenv from 'dotenv';
import { connectToDatabase } from '../db/db-connection.js';

dotenv.config();

const host: string = process.env.REDIS_HOST;
const port: number = process.env.REDIS_PORT;
const mongoUri: string = process.env.MONGODB_URL;

let _taskQueue: Bull.Queue;

export const taskQueue: () => Bull.Queue = () => {
    if (!_taskQueue === undefined) {
        return _taskQueue;
    }

    try {
        _taskQueue = new Bull('task', {
            redis: {
                host,
                port
            }
        });
    } catch (error) {
        console.error(`Issue when creating a task queue: ${error}`);
    }

    _taskQueue.process(async (job) => {
        await connectToDatabase(mongoUri);
        const allTasks = await taskModel.find({});
        console.log(`Job processed at ${Date.now()}. Found tasks: ${allTasks.length}`);
    });

    return _taskQueue;
};
