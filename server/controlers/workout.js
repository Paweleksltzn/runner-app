const User = require('../models/user');
const WorkoutsList = require('../models/workoutsList');
const WorkoutHistory = require('../models/workoutHistory');

exports.getWorkoutsList = (req, res, next) => {
    User.findOne({email: req.token.email, surname: req.token.surname}).then(user=> {
        userVariable = user;
        return WorkoutsList.findOne({owner: user})
    }).then(workouts => {
        return res.json(workouts.workoutsList || []);
    }).catch(err => {
        return res.status(500).send('Wystąpił błąd podczas zapisywania danych');
    })
}

exports.saveWorkoutsList = (req, res, next) => {
    let userVariable;
    User.findOne({email: req.token.email, surname: req.token.surname}).then(user=> {
        userVariable = user;
        return WorkoutsList.findOne({owner: user})
    }).then(workouts => {
        if (workouts) {
            const newWorkoutList = req.body.workouts;
            newWorkoutList.forEach(singleWorkout => {
                if (!singleWorkout.author) singleWorkout.author = userVariable;
            });
            workouts.workoutsList = newWorkoutList;
            workouts.save();
            return res.json('Poprawnie zapisane dane');
        } else {
            const newWorkoutList = req.body.workouts;
            newWorkoutList.forEach(singleWorkout => {
                if (!singleWorkout.author) singleWorkout.author = userVariable;
            });
            const newWorkouts= new WorkoutsList({
                owner: userVariable,
                workoutsList: newWorkoutList
            });
            newWorkouts.save();
            return res.json('Poprawnie zapisane dane');
        }
    }).catch(err => {
        return res.status(500).send('Wystąpił błąd podczas zapisywania danych');
    })
}

exports.addToWorkoutsList = (req, res, next) => {

}

exports.getWorkoutHistory = (req, res, next) => {

}

exports.addWorkoutToHistory = (req, res, next) => {

}

exports.removeWorkoutFromHistory = (req, res, next) => {

}
