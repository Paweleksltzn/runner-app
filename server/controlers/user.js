const User = require('../models/user');
const UserProfile = require('../models/userProfile');
const Notification = require('../models/notification');

const notificationsFactory = require('../util/notifications-factory');
const notificationsOptions = require('../enums/notificationsOptions');

exports.addFriend = async function(req, res, next) {
    try {
        const user = await User.findOne({
            email: req.token.email
        });
        const userProfile = await UserProfile.findById(user.userProfile);
        const newFriend = await User.findOne({
            email: req.body.email
        });
        const newFriendProfile = await UserProfile.findById(newFriend.userProfile);
        newFriendProfile.friendsInvitations.push(userProfile);
        userProfile.invitedToFriends.push(newFriendProfile);
        const newNotification = notificationsFactory.createNotification(notificationsOptions.friendInvitation, user, [newFriend]);
        newFriendProfile.save();
        userProfile.save();
        newNotification.save();
        return res.json(newFriendProfile);
    } catch (err) {
        console.log(err)
        return res.status(500).send('Wystąpił błąd podczas dodawania uzytkownika do znajomych');
    }
}

exports.confirmFriendInvitation = async function(req, res, next) {
    try {
        const newFriendProfile = await UserProfile.findById(req.body.newFriendAcc.userProfile);
        const user = await User.findOne({
            email: req.token.email
        });
        const userProfile = await UserProfile.findById(user.userProfile);
        userProfile.friends.push(newFriendProfile);
        const index = userProfile.friendsInvitations.indexOf(newFriendProfile._id);
        userProfile.friendsInvitations.splice(index, 1);
        newFriendProfile.friends.push(userProfile);
        const otherIndex = newFriendProfile.invitedToFriends.indexOf(userProfile._id);
        newFriendProfile.invitedToFriends.splice(otherIndex, 1);
        const notification = await Notification.findOne({
            receivers: { $all: [user] },
            author: req.body.newFriendAcc
        });
        const notificationIndex = notification.receivers.indexOf(user._id);
        notification.receivers.splice(notificationIndex , 1);
        if (notification.receivers.length < 1) {
            notification.delete();
        } else {
            notification.save();
        }
        const newNotification = notificationsFactory.createNotification(notificationsOptions.friendInvitationResponse, user, [req.body.newFriendAcc], 
            `Użytkownik ${user.name} ${user.surname} przyjął twoje zaproszenie do grona znajomych, możesz się z nim kontaktować`
        );
        newNotification.save();
        userProfile.save();
        newFriendProfile.save();

        return res.json(newFriendProfile);
    } catch (err) {
        console.log(err)
        return res.status(500).send('Wystąpił błąd podczas dodawania uzytkownika do znajomych');
    }
}
