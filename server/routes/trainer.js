const express = require('express');

const trainerController = require('../controlers/trainer');

const router = express.Router();

router.put('/setTrainer', trainerController.setTrainer);

router.post('/rateCoach', trainerController.rateTrainer);

module.exports = router;
