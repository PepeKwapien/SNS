import { NextFunction, Request, Response } from 'express';
import { Connection } from 'mongoose';
import { connectToDatabase } from '../db/db-connection.js';

export const connectToDatabaseMiddleware = (mongoUri: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const connection: Connection = await connectToDatabase(mongoUri);
        next();
    } catch (error) {
        res.status(500).json({ error: 'Failed to establish a database connection' });
    }
};
