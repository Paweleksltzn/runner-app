const express = require('express');
const conversationController = require('../controlers/conversation');

const router = express.Router();

router.get('/all', conversationController.getConversations);
router.post('/newMessage', conversationController.newMessage);
router.post('/createConversation', conversationController.createConversation);
router.put('/displayConversation', conversationController.displayConversation);

module.exports = router;
