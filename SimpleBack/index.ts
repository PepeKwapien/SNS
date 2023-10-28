import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: String,
    dueDate: { type: Date, require: true },
    reminderTime: Date
});

const taskModel = mongoose.model('Task', taskSchema);

dotenv.config();

const mongoUri: string = process.env.MONGODB_URL;

mongoose
    .connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

const dbConnection = mongoose.connection;

dbConnection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

dbConnection.once('open', async () => {
    console.log('Connected to MongoDB');
    console.log(await dbConnection.db.collections());

    const task = new taskModel({ title: 'Connecting Mongo', description: 'Trying it out', dueDate: Date.now() });
    task.save().then(
        () => console.log('One entry added'),
        (err) => console.log(err)
    );
});

const hostname: string = process.env.HOSTNAME;
const port: number = process.env.PORT;

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.send('I got you homie');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
