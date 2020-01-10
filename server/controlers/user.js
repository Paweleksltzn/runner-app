const User = require('../models/user');
const UserProfile = require('../models/userProfile');

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
        newFriendProfile.save();
        userProfile.save();

    } catch (err) {
        return res.status(500).send('Wystąpił błąd podczas wyszukiwania użytkownika');
    }
}
