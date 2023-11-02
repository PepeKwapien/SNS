import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './src/db/db-connection.js';
import { taskController } from './src/controller/task-controller.js';

dotenv.config();

const mongoUri: string = process.env.MONGODB_URL;
const hostname: string = process.env.HOSTNAME;
const port: number = process.env.PORT;

await dbConnection(mongoUri);

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('I got you homie');
});

app.use('/task', taskController());

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
