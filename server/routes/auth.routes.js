const express = require('express');
const { getUsers, createUser, loginUser, logoutUser, getRefreshtoken, checkToken } = require('../controllers/auth.controller.js');

const router = express.Router();

router.get('/', getUsers);
router.post('/create', createUser);
router.delete('/logout', logoutUser);
router.post('/login', loginUser);
router.post('/token', getRefreshtoken);

router.get('/checkToken', checkToken)

module.exports = router;