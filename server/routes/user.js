const express = require('express');

const userController = require('../controlers/user');

const router = express.Router();

router.post('/addFriend', userController.addFriend);
router.post('/confirmFriendInvitation', userController.confirmFriendInvitation);
router.post('/rejectFriendInvitation', userController.rejectFriendInvitation);

module.exports = router;
