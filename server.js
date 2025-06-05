
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import chapterRoutes from './routes/chapter.routes.js';
import { rateLimit } from './middlewares/rateLimiter.js';
import errorHandler from './middlewares/errorHandler.js';
import { config } from './config/config.js';
import Redis from 'ioredis';

dotenv.config();
const app = express();

// Serve static files from 'public' folder
app.use(express.static('public'));

// Initialize Redis client
const redisClient = new Redis({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
});

redisClient.on('connect', async () => {
    console.log('Connected to Redis Cloud');
    try {
        const pingResponse = await redisClient.ping();
        console.log('Redis PING response:', pingResponse); // Should log "PONG"
    } catch (error) {
        console.error('Redis PING failed:', error);
    }
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// Connect to MongoDB
connectDB();

app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use(rateLimit);
app.use('/api/v1/chapters', chapterRoutes);
app.use('/api/v1/auth', authRoutes);

// Global error handler
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

export { redisClient };


// Testing deployment on ec2 instance