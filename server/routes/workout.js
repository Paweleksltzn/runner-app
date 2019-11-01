const express = require('express');
const workoutController = require('../controlers/workout');

const router = express.Router();

router.get('/list/all', workoutController.getWorkoutsList)
router.post('/list', workoutController.saveWorkoutsList);

router.get('/history/all', workoutController.getWorkoutHistory);
router.post('/history/add', workoutController.addWorkoutToHistory);
router.post('/history/remove', workoutController.removeWorkoutFromHistory);

module.exports = router;