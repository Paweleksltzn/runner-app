const express = require('express');

const userController = require('../controlers/user');

const router = express.Router();

router.post('/addFriend', userController.addFriend);
router.post('/confirmFriendInvitation', userController.confirmFriendInvitation);
router.post('/rejectFriendInvitation', userController.rejectFriendInvitation);
router.post('/changeGradient', userController.changeGradient);
router.get('/getFriendsForUserProfile', userController.getFriendsForUserProfile);

module.exports = router;
