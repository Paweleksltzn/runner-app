const express = require('express');
const notificationController = require('../controlers/notification');

const router = express.Router();

router.get('/all', notificationController.getNotifications);
router.delete('/deleteNotification', notificationController.deleteNotification);
router.post('/displayAll', notificationController.displayAll);

module.exports = router;
