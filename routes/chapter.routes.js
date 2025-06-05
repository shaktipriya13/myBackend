import express from 'express';
import { getChapters, getChapterById, uploadChapters } from '../controllers/chapter.controller.js';
import { isAdmin } from '../middlewares/auth.js';
import { rateLimit } from '../middlewares/rateLimiter.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });// Store files temporarily in 'uploads/' folder

router.get('/', rateLimit, getChapters);
router.get('/:id', rateLimit, getChapterById);
router.post('/', rateLimit, isAdmin, upload.single('file'), uploadChapters);

export default router;

