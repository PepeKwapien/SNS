import { NextFunction, Request, Response } from 'express';
import { connectToDatabase } from '../src/db/db-connection.js';
import { Connection } from 'mongoose';

export const connectToDatabaseMiddleware = (mongoUri: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const connection: Connection = await connectToDatabase(mongoUri);
        next();
    } catch (error) {
        res.status(500).json({ error: 'Failed to establish a database connection' });
    }
};
