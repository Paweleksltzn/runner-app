const Achievements = require('../models/achievments');
const socketEvents = require('./socketEvents');
const notificationsFactory = require('./notifications-factory');
const notificationsOptions = require('../enums/notificationsOptions');

const achievementsData = {
    firstWorkout: {icon:"rocket", title: "Dobry start", description: "Pierwszy odbyty trening"},
    profileDescription: {icon:"receipt", title: "Przedstaw się", description: "Dodanie opisu do profilu"},
    profileImage: {icon:"person-circle", title: "W świetle flashy", description: "Dodanie zdjęcia profilowego"},
    firstWorkoutCreated: {icon:"planet", title: "Twórca", description: "Stworzenie pierwszego treningu"},
    tenWorkoutsDone: {icon:"trending-up", title: "Systematyczność popłaca", description: "10 odbytych treningów"},
    coachRateAdded: {icon:"star-half", title: "Recenzent", description: "Dodanie oceny trenera"}
};

exports.checkFirstWorkoutAchievment = async (userProfile, user, checkingAchievment) => {
    const achievment = checkingAchievment;
    let correctAchievment = await Achievements.findOne({title: achievment.title, description: achievment.description});
    if (!correctAchievment) {
        correctAchievment = new Achievements({
            title: achievment.title,
            description: achievment.description,
            icon: achievment.icon
        });
        correctAchievment.save();
    }
    if(!userProfile.achievments.some(userAchievment => userAchievment.title === correctAchievment.title &&
         userAchievment.description === correctAchievment.description)) {
            if (!userProfile.achievments) {
                userProfile.achievments = [];
            }
            userProfile.achievments.push(correctAchievment);
            userProfile.save();
            
            const newNotification = notificationsFactory.createNotification({
                notificationType: notificationsOptions.info,  
                author: user,
                receivers: [user],
                authorMessage: `Udało ci się zdobyć osiągnięcie ${correctAchievment.title}`
            });
            newNotification.save();
            const io = require('../util/socket').getIO();
            io.to(user._id).emit(socketEvents.newAchievment, correctAchievment);
            io.to(user._id).emit(socketEvents.newNotification, newNotification);
    }
}

exports.achievmentsData = achievementsData;