const User = require('../models/user');
const Notification = require('../models/notification');

exports.getNotifications = async function(req, res, next) {
    try {
        const user = await User.findOne({email: req.token.email})
        const userNotifications = await Notification.find({
            receivers: { $all: [user] }
        }).sort(['creationDate', -1]).populate('author');
        if (userNotifications) {
            userNotifications.forEach(notification => {
                notification.receivers = undefined;
            })
        }
        return res.json(userNotifications || []);
    } catch (err) {
        return res.status(500).send('Wystąpił błąd podczas szukania powiadomien');
    }
}

exports.displayAll = async function(req, res, next) {
    try {
        console.log('test')
        const user = await User.findOne({email: req.token.email})
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
        return res.status(500).send('Wystąpił błąd podczas szukania powiadomien');
    }
}