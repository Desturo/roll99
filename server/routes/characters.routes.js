const express = require('express');
const { createCharacter, getCharacters, getUsersCharacters } = require('../controllers/characters.controller.js');
const { authenticateToken } = require('../middleware/middleware.js');

const router = express.Router();

router.get('/', authenticateToken, getCharacters);
router.post('/', createCharacter);
router.post("/get", getUsersCharacters)

module.exports = router;