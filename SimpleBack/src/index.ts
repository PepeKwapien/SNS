import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { taskController } from './controller/task-controller.js';
import { overdueQueue } from './queue/task-queue.js';
import cors from 'cors';
import socketIo from 'socket.io';
import http from 'http';
import { initializeSocket } from './socket/socket.js';

dotenv.config();

const hostname: string = process.env.HOSTNAME;
const port: number = process.env.PORT;

await overdueQueue().add(undefined, { repeat: { cron: '* * * * *' } });

const app: Express = express();
const server = http.createServer(app);
initializeSocket(server);

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('I got you homie');
});

app.use('/task', taskController());

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
