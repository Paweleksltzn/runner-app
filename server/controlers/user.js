const User = require('../models/user');
const UserProfile = require('../models/userProfile');
const Notification = require('../models/notification');

const notificationsFactory = require('../util/notifications-factory');
const notificationsOptions = require('../enums/notificationsOptions');
const socketEvents = require('../util/socketEvents');

exports.addFriend = async function(req, res, next) {
    try {
        const user = await User.findById(req.token._id);
        const userProfile = await UserProfile.findById(user.userProfile);
        const newFriend = await User.findOne({
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname
        });
        const newFriendProfile = await UserProfile.findById(newFriend.userProfile);
        newFriendProfile.friendsInvitations.push(userProfile);
        userProfile.invitedToFriends.push(newFriendProfile);
        const newNotification = notificationsFactory.createNotification(notificationsOptions.friendInvitation, user, [newFriend]);
        const io = require('../util/socket').getIO();
        io.to(newFriend._id).emit(socketEvents.newNotification, newNotification);
        io.to(newFriend._id).emit(socketEvents.newFriendInvitation, userProfile);
        newFriendProfile.save();
        userProfile.save().then(res=>{}).catch(err=>{});;
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
        const user = await User.findById(req.token._id);
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
        const io = require('../util/socket').getIO();
        io.to(req.body.newFriendAcc._id).emit(socketEvents.newNotification, newNotification);
        io.to(req.body.newFriendAcc._id).emit(socketEvents.newFriend, userProfile);
        newNotification.save();
        userProfile.save();
        newFriendProfile.save();
        return res.json(newFriendProfile);
    } catch (err) {
        console.log(err)
        return res.status(500).send('Wystąpił błąd podczas dodawania uzytkownika do znajomych');
    }
}

exports.rejectFriendInvitation = async function(req, res, next) {
    try {
        const rejectedFriendProfile = await UserProfile.findById(req.body.rejectedFriendAcc.userProfile);
        const user = await User.findById(req.token._id);
        const userProfile = await UserProfile.findById(user.userProfile);
        const index = userProfile.friendsInvitations.indexOf(rejectedFriendProfile._id);
        userProfile.friendsInvitations.splice(index, 1);
        const otherIndex = rejectedFriendProfile.invitedToFriends.indexOf(userProfile._id);
        rejectedFriendProfile.invitedToFriends.splice(otherIndex, 1);
        const newNotification = notificationsFactory.createNotification(notificationsOptions.friendInvitationResponse, user, [req.body.rejectedFriendAcc], 
            `Użytkownik ${user.name} ${user.surname} odrzucił twoje zaproszenie do grona znajomych`
        );
        const io = require('../util/socket').getIO();
        io.to(req.body.rejectedFriendAcc._id).emit(socketEvents.newNotification, newNotification);
        io.to(req.body.rejectedFriendAcc._id).emit(socketEvents.newFriendRejection, userProfile);
        newNotification.save();
        userProfile.save();
        rejectedFriendProfile.save().then(res=>{}).catch(err=>{});
        return res.json(rejectedFriendProfile);
    } catch (err) {
        console.log(err)
        return res.status(500).send('Wystąpił błąd podczas usuwania zaproszenia ze znajomych');
    }
}

exports.getFriendsForUserProfile = async function(req, res, next) {
    try {
        const userProfile = await UserProfile.findById(req.query.userProfileId);
        const friends = await UserProfile.find({
            '_id': {
                '$in': userProfile.friends
            }
        });
        return res.json(friends);
    } catch (err) {
        console.log(err)
        return res.status(500).send('Wystąpił błąd podczas usuwania zaproszenia ze znajomych');
    }
}

exports.changeGradient = async function (req, res, next) {
    try {
        const user = await User.findById(req.token._id);
        const userProfile = await UserProfile.findById(user.userProfile);
        userProfile.gradient = req.body.newGradient;
        userProfile.save();
        return res.json({});
    } catch (err) {
        console.log(err)
        return res.status(500).send('Wystąpił błąd podczas zmieniania gradientu');
    }
}

exports.changeDescription = async function (req, res, next) {
    try {
        const user = await User.findById(req.token._id);
        const userProfile = await UserProfile.findById(user.userProfile);
        userProfile.profileDescription = req.body.newDescription;
        userProfile.save();
        return res.json({});
    } catch (err) {
        console.log(err)
        return res.status(500).send('Wystąpił błąd podczas zmieniania gradientu');
    }
}