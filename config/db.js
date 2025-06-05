
import mongoose from 'mongoose';
import { config } from './config.js';

const connectDB = async () => {
    try {
        console.log('Mongo URI:', config.mongoUri); // Debug
        await mongoose.connect(config.mongoUri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;