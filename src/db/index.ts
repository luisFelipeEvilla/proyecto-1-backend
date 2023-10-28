import mongoose, { Connection, ConnectOptions } from 'mongoose';
import { MONGO_URL } from '../config';

const connectionString = MONGO_URL;

let connection: Connection | null = null;

export function createConnection() {
    if (!connection) {
        connection = mongoose.createConnection(connectionString, {
            autoIndex: true, //make this also true
        });
        console.log('Connected to MongoDB');
    }
    return connection;
}
