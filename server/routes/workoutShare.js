const express = require('express');
const workoutShareController = require('../controlers/workoutShare');

const router = express.Router();

router.post('/free/:targetId', workoutShareController.shareWorkoutForFree);

module.exports = router;