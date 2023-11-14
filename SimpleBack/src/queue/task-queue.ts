import Bull from 'bull';
import { Tasks } from '../db/task.js';
import dotenv from 'dotenv';
import { connectToDatabase } from '../db/db-connection.js';
import amqp from 'amqplib';
import { sendObject } from '../broker/broker.js';

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
        const allTasks = await Tasks.find({});
        const expiredTasks = await Tasks.find({ overdueNoticeSent: false }).where('dueDate').lte(Date.now());
        console.log(`Job processed at ${Date.now()}. Found tasks: ${allTasks.length}. Expired tasks: ${expiredTasks.length}`);

        for (const expiredTask of expiredTasks) {
            console.log(`Sending object ${expiredTask} to message broker`);
            await sendObject(expiredTask);
        }

        const updateResult = await Tasks.updateMany(
            { _id: { $in: expiredTasks.map((task) => task._id) } },
            { $set: { overdueNoticeSent: true } }
        );
        console.log(`Updated ${updateResult.modifiedCount} tasks`);
    });

    return _overdueQueue;
};
