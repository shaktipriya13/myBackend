import redis from '../config/redis.js';

export const rateLimit = async (req, res, next) => {
    try {
        const ip = req.ip;
        const key = `rate-limit:${ip}`;
        const requests = await redis.incr(key);

        if (requests === 1) {
            await redis.expire(key, 60); // 60-second window
        }

        if (requests > 30) {
            return res.status(429).json({ error: 'Too Many Requests' });
        }

        next();
    } catch (error) {
        next(error);
    }
};