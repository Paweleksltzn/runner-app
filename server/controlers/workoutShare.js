const User = require('../models/user');
const UserProfile = require('../models/userProfile');
const WorkoutsList = require('../models/workoutsList');
const Notification = require('../models/notification');

const notificationsFactory = require('../util/notifications-factory');
const notificationsOptions = require('../enums/notificationsOptions');
const socketEvents = require('../util/socketEvents');

exports.shareWorkoutForFree = async function(req, res, next) {
    try {
        const author = await User.findById(req.token._id);
        const targetUser = await User.findOne({
            userProfile: req.params.targetId
        });
        const newNotification = notificationsFactory.createNotification({
            notificationType: notificationsOptions.workoutsShare,  
            author,
            receivers: [targetUser],
            sharedWorkoutsList: req.body.workoutsList
        });
        const io = require('../util/socket').getIO();
        io.to(targetUser._id).emit(socketEvents.newNotification, newNotification);
        newNotification.save();
        return res.json({});
    } catch(err) {
        console.log(err);
        return res.status(500).send('Nie udało się pobrać danych');
    }
}

exports.acceptFreeWorkoutShare = async function(req, res, next) {
    try {
        const owner = await User.findById(req.token._id);
        const shareAuthor = await User.findById(req.query.shareAuthorId);
        const workoutsList = await WorkoutsList.findOne({ owner });
        const sharedWorkouts = req.body.workoutsList;
        if (workoutsList) {
            workoutsList.workoutsList = [...workoutsList.workoutsList, ...sharedWorkouts];
            workoutsList.save().then(res=>{}).catch(err=>{});
        } else {
            const newWorkouts = new WorkoutsList({
                owner,
                workoutsList:  sharedWorkouts
            });
            newWorkouts.save(); 
        }
        const notification = await Notification.findOne({
            receivers: { $all: [owner] },
            author: shareAuthor
        });
        const notificationIndex = notification.receivers.indexOf(owner._id);
        notification.receivers.splice(notificationIndex , 1);
        if (notification.receivers.length < 1) {
            notification.delete();
        } else {
            notification.save();
        }
        const newNotification = notificationsFactory.createNotification({
            notificationType: notificationsOptions.info,  
            author: owner,
            receivers: [shareAuthor],
            authorMessage: `Użytkownik ${owner.nameAndSurname} zaakceptował próbę udostępnienia mu treningów. Teraz dzięki tobie będzie mógł poznawać nowe możliwości!`,
            definiedTitle: 'Treningi udostępnione'
        });
        const io = require('../util/socket').getIO();
        io.to(shareAuthor._id).emit(socketEvents.newNotification, newNotification);
        newNotification.save();
        return res.json({});
    } catch(err) {
        console.log(err);
        return res.status(500).send('Nie udało się pobrać danych');
    }
}
