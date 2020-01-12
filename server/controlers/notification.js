const User = require('../models/user');
const Notification = require('../models/notification');

exports.getNotifications = async function(req, res, next) {
    try {
        const user = await User.findById(req.token._id);
        const io = require('../util/socket').getIO();
        const socket = io.sockets.connected[req.socketId];
        if (socket) {
            socket.join(user._id);
        } else {
            console.log('socket error');
        }
        const userNotifications = await Notification.find({
            receivers: { $all: [user] }
        }).sort({'creationDate': -1}).populate('author');
        if (userNotifications) {
            userNotifications.forEach(notification => {
                notification.receivers = undefined;
            })
        }
        return res.json(userNotifications || []);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas szukania powiadomien');
    }
}

exports.displayAll = async function(req, res, next) {
    try {
        const user = await User.findById(req.token._id);
        const userNotifications = await Notification.find({
            receivers: { $all: [user] }
        }).populate('author');
        if (userNotifications) {
            userNotifications.forEach(notification => {
                notification.isDisplayed = true;
                notification.save();
            })
        }
        return res.json(userNotifications || []);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas szukania powiadomien');
    }
}

exports.deleteNotification = async function(req, res, next) {
    try {
        const notification = await Notification.findById(req.query.notificationId);
        const user = await User.findById(req.token._id);
        const index = notification.receivers.indexOf(user._id);
        notification.receivers.splice(index , 1);
        if (notification.receivers.length < 1) {
            notification.delete();
        } else {
            notification.save();
        }
        return res.json({});
    } catch (err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas usuwania powiadomienia');
    }
}
