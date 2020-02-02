const User = require('../models/user');
const WorkoutsList = require('../models/workoutsList');
const WorkoutHistory = require('../models/workoutHistory');

exports.getWorkoutsList = async function(req, res, next) {
    try {
        const userVariable = await User.findById(req.token._id);
        let workouts = await WorkoutsList.findOne({owner: userVariable});
        if (!workouts) {
            workouts = [];
        }
        return res.json(workouts.workoutsList || []);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Nie udało się pobrać danych');
    }
}

exports.saveWorkoutsList = async function(req, res, next) {
    try {
        const userVariable = await User.findById(req.token._id);
        const newWorkoutList = req.body.workouts;
        newWorkoutList.forEach(singleWorkout => {
            if (!singleWorkout.author) singleWorkout.author = userVariable;
            if (!singleWorkout.creationDate) singleWorkout.creationDate = new Date();
        });
        const workouts = await WorkoutsList.findOne({owner: userVariable});
        if (workouts) {
            workouts.workoutsList = newWorkoutList;
            workouts.save().then(res=>{}).catch(err=>{});
        } else {
            const newWorkouts = new WorkoutsList({
                owner: userVariable,
                workoutsList: newWorkoutList
            });
            newWorkouts.save(); 
        }
        return res.json('Poprawnie zapisane dane');
    } catch(err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas zapisywania danych');
    }
}

exports.getWorkoutHistory = async function(req, res, next) {
    try {
        const user = await User.findById(req.token._id);
        const userWorkoutsHistory = await WorkoutHistory.findOne({owner: user});
        return res.json(userWorkoutsHistory);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas zapisywania danych');
    }
}

exports.addWorkoutToHistory = async function(req, res, next) {
    try {
        const userVariable = await User.findById(req.token._id);
        const authorId = req.body.workout.author;
        const author = await User.findById(authorId);
        const userWorkoutsHistory = await WorkoutHistory.findOne({owner: userVariable});
        const newWorkoutInHistory = req.body.workout;
        if (userWorkoutsHistory) {
            userWorkoutsHistory.workoutsHistory = [createNewHistoryWorkout(newWorkoutInHistory, userVariable, author).workoutsHistory[0], ...userWorkoutsHistory.workoutsHistory];
            userWorkoutsHistory.save();
        } else {
            const newWorkoutsHistory = new WorkoutHistory(createNewHistoryWorkout(newWorkoutInHistory, userVariable, author));
            newWorkoutsHistory.save();
        }
        const userWorkoutsList = await WorkoutsList.findOne({owner: userVariable});
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
                    const newWorkouts = new WorkoutsList({
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
    } catch(err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas zapisywania danych');
    }
}

exports.removeWorkoutFromHistory = async function(req, res, next) {
    const title = req.query.title;
    const duration = req.query.duration;
    const trainingDate = req.query.trainingDate;
    try {
        const owner = await User.findById(req.token._id);
        const history = await WorkoutHistory.findOne({
            owner
        });
        const newWorkoutsHistory = history.workoutsHistory.filter(workout =>  {
            return workout.title !== title || workout.duration !== duration || workout.trainingDate !== trainingDate
        });
        history.workoutsHistory = newWorkoutsHistory;
        history.save();
        return res.json('Trening usunięty pomyślnie');
    } catch(err) {
        console.log(err);
        return res.status(500).send('Nie udało się usunąć treningu');
    }
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
