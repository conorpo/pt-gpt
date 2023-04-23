const express = require('express');
const router = express.Router();

const updateInfoController = require('../../controllers/update_info');

router.post('/update_info', updateInfoController);

module.exports = router;
