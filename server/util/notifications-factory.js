
const Notification = require('../models/notification');
const notificationsOptions = require('../enums/notificationsOptions');

// options propertys
// notificationType, author, receivers, authorMessage, definiedTitle, sharedWorkoutsList

exports.createNotification = function(options) {
    let title;
    let message;
    let newFriendId = '';
    const isDisplayed = false;
    switch(options.notificationType) {
        case notificationsOptions.friendInvitation: {
            title = 'Zaproszenie do znajomych';
            newFriendId = options.author.userProfile;
            message = `Witaj ${options.receivers[0].name}, czy chciałbyś zostać moim znajomym ?`;
            break;
        }
        case notificationsOptions.info: {
            message = options.authorMessage;
            title = options.definiedTitle || 'Informacja';
            break;
        }
        case notificationsOptions.friendInvitationResponse: {
            title = 'Odpowiedź na zaproszenie';
            message = options.authorMessage;
            break;
        }
        case notificationsOptions.workoutsShare: {
            title = 'Propozycja nowych treningów';
            message = `Witaj ${options.receivers[0].name}, zapraszam cię do użytkowania moich treningów.`;
            break;
        }
    }
    return new Notification({
        title,
        type: options.notificationType,
        message,
        newFriendId,
        isDisplayed,
        author: options.author,
        receivers: options.receivers,
        sharedWorkoutsList: options.sharedWorkoutsList || undefined,
        creationDate: new Date()
    });
}
