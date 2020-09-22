const express = require('express');

const searchersController = require('../controlers/searcher');

const router = express.Router();

router.get('/players', searchersController.searchUsers);

module.exports = router;
