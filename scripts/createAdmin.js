import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import connectDB from '../config/db.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();
        const admin = new User({
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin',
        });
        await admin.save();
        console.log('Admin user created');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();