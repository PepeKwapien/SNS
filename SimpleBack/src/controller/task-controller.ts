import { Router } from 'express';
import { taskModel } from '../db/task.js';
import { TaskDto } from '../dto/task-dto.js';
import dotenv from 'dotenv';
import { connectToDatabaseMiddleware } from '../../middleware/db-connection-middleware.js';

dotenv.config();

const mongoUri: string = process.env.MONGODB_URL;

export function taskController() {
    const taskController = Router();

    taskController.use(connectToDatabaseMiddleware(mongoUri));

    taskController.get('/', async (req, res) => {
        const allTasks = await taskModel.find({});
        res.json(allTasks);
    });

    taskController.post('/', async (req, res) => {
        const taskDto = req.body as TaskDto;
        const newTask = new taskModel({ ...taskDto });
        await newTask.save();
        res.send();
    });

    return taskController;
}
