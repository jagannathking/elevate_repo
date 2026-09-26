import mongoose from 'mongoose';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// Construct Redis URL from individual components
// redis://[username:password@]host:port
let redisUrl;
if (process.env.REDIS_USERNAME && process.env.REDIS_PASSWORD) {
    redisUrl = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
} else if (process.env.REDIS_PASSWORD) { 
    redisUrl = `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
} else {
    redisUrl = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
}


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully.');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
    }
};

export const connectRedis = async () => {
    if (!redisUrl) {
        console.error('Redis URL is not configured. Please check .env file.');
    }
    const client = createClient({ url: redisUrl });

    client.on('error', (err) => {
        console.error('Redis Client Error:', err);
    });

    client.on('connect', () => {
        console.log('Redis connecting...');
    });

    client.on('ready', () => {
        console.log('Redis client ready and connected.');
    });

    client.on('end', () => {
        console.log('Redis client disconnected.');
    });


    try {
        await client.connect();
        return client;
    } catch (err) {
        console.error('Failed to connect to Redis initially:', err);

    }
};