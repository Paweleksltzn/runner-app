
const Notification = require('../models/notification');
const notificationsOptions = require('../enums/notificationsOptions');

exports.createNotification = function(notificationType, author, receivers, authorMessage) {
    const dateString = createDateString();
    let title;
    let message;
    let newFriendId = '';
    const isDisplayed = false;
    switch(notificationType) {
        case notificationsOptions.friendInvitation: {
            title = 'Zaproszenie do znajomych';
            newFriendId = author.userProfile;
            message = `Witaj ${receivers[0].name}, czy chciałbyś zostać moim znajomym ?`;
            break;
        }
        case notificationsOptions.friendInvitationResponse: {
            title = 'Odpowiedź na zaproszenie';
            message = authorMessage;
            break;
        }
    }
    return new Notification({
        title,
        type: notificationType,
        message,
        newFriendId,
        isDisplayed,
        dateString,
        author,
        receivers,
        creationDate: new Date()
    });
}

const createDateString = function() {
    const currentDate = new Date();
    const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
    const month = currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return `${day}.${month}.${year}`
}
