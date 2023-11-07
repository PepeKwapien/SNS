import mongoose from 'mongoose';

let dbConnection: mongoose.Connection;

export const connectToDatabase = async (mongoUri: string) => {
    if (dbConnection) {
        return dbConnection;
    }

    dbConnection = mongoose.connection;

    dbConnection.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
    });

    dbConnection.once('open', async () => {
        console.log('Connected to MongoDB');
    });

    dbConnection.on('close', async () => {
        console.log('Bye, have a wonderful time!');
    });

    try {
        await mongoose.connect(mongoUri);
    } catch (error) {
        console.log(error);
    }

    return dbConnection;
};
