const express = require('express');
const router = express.Router();
const {login, register, verify} = require('../../controllers/auth.js');

router.post('/login', login);
router.post('/register', register);
router.get('/verify', verify);

module.exports = router;