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

// import express from 'express';
// import { getChapters, getChapterById, uploadChapters } from '../controllers/chaptersController.js';
// import { authAdmin } from '../middleware/auth.js';
// import multer from 'multer';

// const router = express.Router();

// // Configure multer
// const upload = multer({ dest: 'uploads/' });

// console.log('Setting up chapter routes'); // Confirm routes are mounted

// router.get('/', (req, res, next) => {
//     console.log('Reached GET /api/v1/chapters route');
//     getChapters(req, res, next);
// });
// router.get('/:id', getChapterById);
// router.post('/', authAdmin, upload.single('file'), uploadChapters);

// export default router;