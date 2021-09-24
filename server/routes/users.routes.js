import express from 'express';
import { createUser, getUsers, getUserCheck } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/check', getUserCheck)
router.post('/', createUser);

export default router;