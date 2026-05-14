const express = require('express');
const router = express.Router();
const { login, me, logout } = require('../controllers/auth.controller');
const { authenticate } = require('../middlewares/auth');

router.post('/login', login);
router.get('/me', authenticate, me);
router.post('/logout', authenticate, logout);

module.exports = router;
