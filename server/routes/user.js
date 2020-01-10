const express = require('express');

const userController = require('../controlers/user');

const router = express.Router();

router.get('/addFriend', userController.addFriend);

module.exports = router;
