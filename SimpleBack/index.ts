import express, { Express, Request, Response } from 'express';

const hostname: string = process.env.HOSTNAME ?? 'localhost';
const port: number = +(process.env.PORT ?? 3000);

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('I got you homie');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
