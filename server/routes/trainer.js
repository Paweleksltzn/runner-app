const express = require('express');

const trainerController = require('../controlers/trainer');

const router = express.Router();

router.put('/setTrainer', trainerController.setTrainer);

module.exports = router;
