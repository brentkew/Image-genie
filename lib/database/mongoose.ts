import mongoose, { Mongoose } from 'mongoose';
import { cache } from 'react';

const MONGODB_URL = process.env.MONGO_DB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Create an variable cached of type mongoose connection and make it as global
let cached: MongooseConnection = (global as any).mongoose;
if(!cached) {
    cached: (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectionToDatabase = async ()=> {
    if(cached.conn) return cached.conn;
    if(!MONGODB_URL) {
        throw new Error('Missing MONGODB URL')
    }
    // Creating new connection
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'image-genie',
        bufferCommands: false
    })
    cached.conn = await cached.promise;
    return cached.conn;
}