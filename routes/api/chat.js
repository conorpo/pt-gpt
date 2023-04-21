const express = require('express');
const router = express.Router();
const chatController = require('../../controllers/chat');

router.post('/chat', chatController);

module.exports = router;