import express from 'express';
import { getUsers, createUser, loginUser, logoutUser, getRefreshtoken } from '../controllers/auth.controller.js';
import { sendToken } from '../middleware/middleware.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/create', createUser);
router.delete('/logout', logoutUser);
router.post('/login', loginUser);
router.post('/token', getRefreshtoken);

export default router;