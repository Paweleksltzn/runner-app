
const Notification = require('../models/notification');
const notificationsOptions = require('../enums/notificationsOptions');

exports.createNotification = function(notificationType, author, receivers, authorMessage, definiedTitle) {
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
        case notificationsOptions.info: {
            message = authorMessage;
            title = definiedTitle || 'Informacja';
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
        author,
        receivers,
        creationDate: new Date()
    });
}
