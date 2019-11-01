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

exports.getWorkoutHistory = (req, res, next) => {

}

exports.addWorkoutToHistory = (req, res, next) => {
    let userVariable;
    let author;
    User.findOne({email: req.token.email, surname: req.token.surname}).then(user=> {
        userVariable = user;
        const authorId = req.body.workout.author;
        return User.findById(authorId);
    }).then(author => {
        author = author;
        return WorkoutHistory.findOne({owner: userVariable})
    }).then(userWorkoutsHistory => {
        const newWorkoutInHistory = req.body.workout;
        if (userWorkoutsHistory) {
            userWorkoutsHistory.workoutsHistory = [createNewHistoryWorkout(newWorkoutInHistory, userVariable, author).workoutsHistory[0], ...userWorkoutsHistory.workoutsHistory];
            userWorkoutsHistory.save();
        } else {
            const newWorkoutsHistory = new WorkoutHistory(createNewHistoryWorkout(newWorkoutInHistory, userVariable, author));
            newWorkoutsHistory.save();
        }
        return WorkoutsList.findOne({owner: userVariable});
    }).then(userWorkoutsList => {
        const selectedWorkoutId = req.body.selectedWorkoutId;
        if (req.body.shouldSave) {
            if (!selectedWorkoutId) {
                if (userWorkoutsList) {
                    const newUserWorkoutsList = userWorkoutsList;
                    newUserWorkoutsList.workoutsList.push({
                        title: req.body.workout.title,
                        author: author || userVariable,
                        excercises: req.body.workout.excercises
                    })
                    newUserWorkoutsList.save();
                } else {
                    const newWorkouts= new WorkoutsList({
                        owner: author || userVariable,
                        workoutsList: [req.body.workout]
                    });
                    newWorkouts.save();
                }
            } else {
                const newUserWorkoutsList = userWorkoutsList;
                newUserWorkoutsList.workoutsList.forEach(workout => {
                    if (workout._id === selectedWorkoutId) {
                        workout = req.body.workout
                    }
                })
                newUserWorkoutsList.save();
            }
        }
        return res.json('Trening zapisany');
    })
    .catch(err => {
        return res.status(500).send('Wystąpił błąd podczas zapisywania danych');
    });
}

exports.removeWorkoutFromHistory = (req, res, next) => {

}


const createNewHistoryWorkout = (newWorkoutInHistory, userVariable, author) => {
    const durationInMs = Date.now() - newWorkoutInHistory.startTime;
    let seconds = Math.floor(durationInMs / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes - hours * 60;
    seconds = seconds > 10 ? seconds : `0${seconds}`;
    minutes = minutes > 10 ? minutes : `0${minutes}`;
    hours = hours > 10 ? hours : `0${hours}`;
    const finalDurationString = `${hours}:${minutes}:${seconds}`;
    return {
        owner: userVariable,
        workoutsHistory: [{
            title: newWorkoutInHistory.title,
            author: author || userVariable,
            trainingDate: newWorkoutInHistory.trainingDate,
            durationInMs,
            duration: finalDurationString,
            excercises: newWorkoutInHistory.excercises
        }]
    }
}
