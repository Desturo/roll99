import express from 'express';
import { authenticate, createUser, loginUser } from '../controllers/login.controller.js';

const router = express.Router();

router.get('/', authenticate);
router.post('/', createUser);

router.post('/auth', loginUser);

export default router;