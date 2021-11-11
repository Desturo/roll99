import express from 'express';
import { createCharacter, getCharacters, getUsersCharacters } from '../controllers/characters.controller.js';
import { authenticateToken } from '../middleware/middleware.js';

const router = express.Router();

router.get('/', authenticateToken, getCharacters);
router.post('/', createCharacter);
router.post("/get", getUsersCharacters)

export default router;