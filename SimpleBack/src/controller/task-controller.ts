import { Router } from 'express';
import { Tasks } from '../db/task.js';
import { TaskDto } from '../dto/task-dto.js';
import dotenv from 'dotenv';
import { connectToDatabaseMiddleware } from '../middleware/db-connection-middleware.js';

dotenv.config();

const mongoUri: string = process.env.MONGODB_URL;

export function taskController() {
    const taskController = Router();

    taskController.use(connectToDatabaseMiddleware(mongoUri));

    taskController.get('/', async (req, res) => {
        const allTasks = await Tasks.find({});
        res.json(allTasks);
    });

    taskController.post('/', async (req, res) => {
        const taskDto = req.body as TaskDto;
        const newTask = new Tasks({ ...taskDto });
        await newTask.save();
        res.send();
    });

    return taskController;
}
