import express from 'express';
import { createCharacter, getCharacters } from '../controllers/characters.controller.js';
import { authenticateToken } from '../middleware/middleware.js';

const router = express.Router();

router.get('/', authenticateToken, getCharacters);
router.post('/', createCharacter);

export default router;