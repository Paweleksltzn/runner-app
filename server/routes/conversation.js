const express = require('express');
const conversationController = require('../controlers/conversation');

const router = express.Router();

router.get('/all', conversationController.getConversations);

module.exports = router;
