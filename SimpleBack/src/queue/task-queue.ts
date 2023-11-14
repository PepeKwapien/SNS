import Bull from 'bull';
import { taskModel } from '../db/task.js';
import dotenv from 'dotenv';
import { connectToDatabase } from '../db/db-connection.js';

dotenv.config();

const host: string = process.env.REDIS_HOST;
const port: number = process.env.REDIS_PORT;
const mongoUri: string = process.env.MONGODB_URL;

let _overdueQueue: Bull.Queue;

export const overdueQueue: () => Bull.Queue = () => {
    if (!_overdueQueue === undefined) {
        return _overdueQueue;
    }

    try {
        _overdueQueue = new Bull('task', {
            redis: {
                host,
                port
            }
        });
    } catch (error) {
        console.error(`Issue when creating an overdue queue: ${error}`);
    }

    _overdueQueue.process(async (job) => {
        await connectToDatabase(mongoUri);
        const allTasks = await taskModel.find({});
        const expiredTasks = await taskModel.find({ overdueNoticeSent: false }).where('dueDate').lte(Date.now());
        console.log(`Job processed at ${Date.now()}. Found tasks: ${allTasks.length}. Expired tasks: ${expiredTasks.length}`);
        const updateResult = await taskModel.updateMany(
            { _id: { $in: expiredTasks.map((task) => task._id) } },
            { $set: { overdueNoticeSent: true } }
        );
        console.log(`Updated ${updateResult.modifiedCount} tasks`);
    });

    return _overdueQueue;
};
