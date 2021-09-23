import express from 'express';
import { createCharacter, getCharacters } from '../controllers/characters.controller.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);

export default router;