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
