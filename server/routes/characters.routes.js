import express from 'express';
import { getCharacters } from '../controllers/characters.controller.js';

const router = express.Router();

router.get('/', getCharacters);

export default router;