const express = require('express');
const multer = require('multer');

const userController = require('../controlers/user');
const storage = require('../util/files-savers/userProfileImage');

const router = express.Router();

router.post('/addFriend', userController.addFriend);
router.post('/confirmFriendInvitation', userController.confirmFriendInvitation);
router.post('/rejectFriendInvitation', userController.rejectFriendInvitation);
router.post('/changeGradient', userController.changeGradient);
router.post('/changeDescription', userController.changeDescription);
router.post('/changeProfileImage', multer({storage}).single('profileImage'), userController.changeProfileImage);
router.get('/getFriendsForUserProfile', userController.getFriendsForUserProfile);

module.exports = router;
