const User = require('../models/user');
const UserProfile = require('../models/userProfile');

const jwtManagment = require('../auth-guards/jwt-managment');

exports.setTrainer = async function(req, res, next) {
    try {
        const user = await User.findById(req.token._id);
        const userProfile = await UserProfile.findById(user.userProfile);
        userProfile.accessLevel = 2;
        user.accessLevel = 2;
        userProfile.save();
        user.save();
        return res.json(jwtManagment.jwtFactory(user));
    } catch(err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas zapisywania danych');
    }
}

exports.rateTrainer  = async function(req, res, next) {
    try {
        const user = await User.findById(req.token._id);
        const userProfile = await UserProfile.findById(user.userProfile).populate('ratedTrainers.trainer');
        const trainer = await UserProfile.findById(req.body.trainerId);
        const newRate = req.body.rate;
        let wasRaited = false;
        userProfile.ratedTrainers.forEach(ratedTrainer => {
            if(ratedTrainer.trainer._id.toString() === trainer._id.toString()) {
                trainer.ratesSum = trainer.ratesSum + newRate - ratedTrainer.rate;
                ratedTrainer.rate = newRate;
                wasRaited = true;
            }
        });
        if (!wasRaited) {
            trainer.ratesSum = (trainer.ratesSum || 0) + req.body.rate;
            trainer.ratesAmount = (trainer.ratesAmount || 0) + 1;
            userProfile.ratedTrainers.push({
                trainer,
                rate: newRate
            })
        }
        userProfile.save();
        trainer.save();
        achievmentsController.checkFirstWorkoutAchievment(userProfile, user, achievmentsController.achievmentsData.coachRateAdded);
        return res.json({ratesSum: trainer.ratesSum, ratesAmount: trainer.ratesAmount});
    } catch(err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas oceniania trenera');
    }
}
