const express = require('express');

const socketController = require('../controlers/socket');

const router = express.Router();

router.post('/socketRoom', socketController.joinUserRoom);

module.exports = router;
