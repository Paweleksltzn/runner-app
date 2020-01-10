const express = require('express');

const userController = require('../controlers/user');

const router = express.Router();

router.post('/addFriend', userController.addFriend);

module.exports = router;
