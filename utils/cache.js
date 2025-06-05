import redis from '../config/redisClient.js';

export const cacheData = async (key, data, ttl) => {
    try {
        await redis.set(key, JSON.stringify(data), 'EX', ttl);
    } catch (error) {
        console.error('Cache set error:', error);
    }
};

export const getCachedData = async (key) => {
    try {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Cache get error:', error);
        return null;
    }
};

export const invalidateCache = async (pattern) => {
    try {
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
            await redis.del(keys);
        }
    } catch (error) {
        console.error('Cache invalidation error:', error);
    }
};