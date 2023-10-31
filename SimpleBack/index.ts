import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './db/db-connection.js';

dotenv.config();

const mongoUri: string = process.env.MONGODB_URL;
const hostname: string = process.env.HOSTNAME;
const port: number = process.env.PORT;

const connection = await dbConnection(mongoUri);

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('I got you homie');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
