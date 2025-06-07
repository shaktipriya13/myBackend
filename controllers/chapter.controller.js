import Chapter from '../models/Chapter.model.js';
import redis from '../config/redis.js';
import { cacheData, getCachedData, invalidateCache } from '../utils/cache.js';

import fs from 'fs/promises';



export const getChapters = async (req, res, next) => {
    try {
        const { class: classFilter, unit, status, isWeakChapter, subject, page = 1, limit = 10 } = req.query;
        const cacheKey = `chapters:${JSON.stringify(req.query)}`;

        // Check cache
        console.log(`Checking cache for key: ${cacheKey}`);
        const cached = await getCachedData(cacheKey);
        if (cached) {
            console.log('Cache hit - returning cached data');
            return res.json(cached);
        }
        console.log('Cache miss - querying database');

        // Build query
        const query = {};
        if (classFilter) query.class = classFilter;
        if (unit) query.unit = unit;
        if (status) query.status = status;
        if (isWeakChapter) query.isWeakChapter = isWeakChapter === 'true';
        if (subject) query.subject = subject;

        // Pagination
        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        // Fetch chapters
        console.log('Querying database with query:', query);
        const chapters = await Chapter.find(query)
            .skip(skip)
            .limit(limitNum)
            .lean();

        const total = await Chapter.countDocuments(query);

        const response = {
            total,
            page: pageNum,
            limit: limitNum,
            chapters,
        };

        // Cache results
        console.log('Caching response with TTL 3600 seconds');
        await cacheData(cacheKey, response, 3600);

        res.json(response);
    } catch (error) {
        next(error);
    }
};

// Get chapter by ID
export const getChapterById = async (req, res, next) => {
    try {
        const chapter = await Chapter.findById(req.params.id).lean();
        if (!chapter) {
            return res.status(404).json({ error: 'Chapter not found' });
        }
        res.json(chapter);
    } catch (error) {
        next(error);
    }
};


export const uploadChapters = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        let chaptersData;
        try {
            const fileContent = await fs.readFile(req.file.path, 'utf-8');
            chaptersData = JSON.parse(fileContent);
        } catch (error) {
            await fs.unlink(req.file.path).catch(() => { });
            return res.status(400).json({ error: 'Invalid JSON file' });
        }

        if (!Array.isArray(chaptersData)) {
            await fs.unlink(req.file.path).catch(() => { });
            return res.status(400).json({ error: 'File content must be an array of chapters' });
        }

        const errors = [];
        const validChapters = [];

        for (const chapterData of chaptersData) {
            try {
                const chapter = new Chapter(chapterData);
                await chapter.validate();
                validChapters.push(chapter);
            } catch (error) {
                errors.push({ chapter: chapterData, error: error.message });
            }
        }

        if (validChapters.length > 0) {
            await Chapter.insertMany(validChapters);
            await invalidateCache('chapters:*');
        }

        await fs.unlink(req.file.path);

        res.status(201).json({
            message: 'Chapters processed',
            uploaded: validChapters.length,
            errors,
        });
    } catch (error) {
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => { });
        }
        next(error);
    }
};