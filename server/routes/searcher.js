const express = require('express');

const searchersController = require('../controlers/searcher');

const router = express.Router();

router.get('/players', searchersController.searchUsers);

router.get('/friends', searchersController.searchFriends);

module.exports = router;
