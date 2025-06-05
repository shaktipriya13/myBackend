import express from 'express';
import { login } from '../controllers/auth.controller.js'; // Use the controller

const router = express.Router();

router.post('/login', login); // Uncommented and using the controller

export default router;