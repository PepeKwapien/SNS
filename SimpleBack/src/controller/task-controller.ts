import { Router } from 'express';
import { taskModel } from '../db/task.js';
import { TaskDto } from '../dto/task-dto.js';

export function taskController() {
    const taskController = Router();

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
