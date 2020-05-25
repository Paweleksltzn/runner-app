const User = require('../models/user');
const UserProfile = require('../models/userProfile');
const Notification = require('../models/notification');

const notificationsFactory = require('../util/notifications-factory');
const notificationsOptions = require('../enums/notificationsOptions');
const socketEvents = require('../util/socketEvents');
const fs = require('fs');

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
        const newNotification = notificationsFactory.createNotification({
            notificationType: notificationsOptions.friendInvitation,  
            author: user,
            receivers: [newFriend]
        });
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

exports.removeFriend = async function(req, res, next) {
    try {
        const user = await User.findById(req.token._id);
        const userProfile = await UserProfile.findById(user.userProfile);
        const removedFriendProfile = await UserProfile.findById(req.params.removedFriendId);
        const oldFriend = await User.findOne({userProfile: removedFriendProfile})
        let removedFriendIndex = userProfile.friends.findIndex(friend => friend === req.params.removedFriendId);
        userProfile.friends.splice(removedFriendIndex, 1);
        removedFriendIndex =  removedFriendProfile.friends.findIndex(friend => friend === userProfile._id);
        removedFriendProfile.friends.splice(removedFriendIndex, 1);
        const newNotification = notificationsFactory.createNotification({
            notificationType: notificationsOptions.info,  
            author: user,
            receivers: [oldFriend],
            authorMessage: `Użytkownik ${user.nameAndSurname} usunoł cię z listy znajomych`,
            definiedTitle: 'Usunięcie z listy znajomych'
        });
        const io = require('../util/socket').getIO();
        io.to(oldFriend._id).emit(socketEvents.newNotification, newNotification);
        io.to(oldFriend._id).emit(socketEvents.friendDeletion, userProfile._id);
        removedFriendProfile.save();
        userProfile.save();
        newNotification.save();
        return res.json({});
    } catch (err) {
        console.log(err)
        return res.status(500).send('Wystąpił błąd podczas usuwania użytkownika ze znajomych');
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
        const newNotification = notificationsFactory.createNotification({
            notificationType: notificationsOptions.friendInvitationResponse,  
            author: user,
            receivers: [req.body.newFriendAcc],
            authorMessage: `Użytkownik ${user.name} ${user.surname} przyjął twoje zaproszenie do grona znajomych, możesz się z nim kontaktować`
        });
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
        const newNotification = notificationsFactory.createNotification({
            notificationType: notificationsOptions.friendInvitationResponse,  
            author: user,
            receivers: [req.body.rejectedFriendAcc],
            authorMessage: `Użytkownik ${user.name} ${user.surname} odrzucił twoje zaproszenie do grona znajomych`
        });
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
        achievmentsController.checkFirstWorkoutAchievment(userProfile, user, achievmentsController.achievmentsData.profileDescription);
        return res.json({});
    } catch (err) {
        console.log(err)
        return res.status(500).send('Wystąpił błąd podczas zmieniania gradientu');
    }
}

exports.changeProfileImage  = async function (req, res, next) {
    try {
        const user = await User.findById(req.token._id);
        const userProfile = await UserProfile.findById(user.userProfile);
        const profileImg = req.profileImg;
        const protocol = req.protocol === 'http' ? 'https' : req.protocol;
        const url = `${protocol}://${req.get('host')}`;
        const imagePath = `${url}/files/profile-images/${profileImg}`;
        const index = userProfile.imgUrl.indexOf('profile-images/') + 15;
        if (index >= 0) {
            const fileName = userProfile.imgUrl.substr(index, 100);
            if (fileName) {
                fs.unlink(`public/files/profile-images/${fileName}`,function(err){
                    if(err) {console.log(err);}
                    console.log('file deleted successfully');
                });  
            }
        }
        userProfile.imgUrl = imagePath;
        userProfile.save();
        achievmentsController.checkFirstWorkoutAchievment(userProfile, user, achievmentsController.achievmentsData.profileImage);
        return res.json({imgUrl: imagePath});
    } catch (err) {
        console.log(err)
        return res.status(500).send('Wystąpił błąd podczas zmiany zdjecia profilowego');
    }
}

exports.removeProfileImage  = async function (req, res, next) {
    try {
        const user = await User.findById(req.token._id);
        const userProfile = await UserProfile.findById(user.userProfile);
        if (userProfile.imgUrl) {
            const index = userProfile.imgUrl.indexOf('profile-images/') + 15;
            const fileName = userProfile.imgUrl.substr(index, 100);
            if (fileName) {
                fs.unlink(`public/files/profile-images/${fileName}`,function(err){
                    if(err) {console.log(err);}
                    console.log('file deleted successfully');
                });  
            }
            userProfile.imgUrl = '';
            userProfile.save();
        }
        return res.json({message: 'Pomyślnie usunięto zdjęcie profilowe'});
    } catch (err) {
        console.log(err)
        return res.status(500).send('Wystąpił błąd podczas usuwania zdjecia profilowego');
    }
}
