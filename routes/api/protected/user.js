const express = require('express');
const router = express.Router();
const {getUser, updateUser} = require('../../../controllers/user');

router.get('/user', getUser);
router.post('/user', updateUser);

module.exports = router;