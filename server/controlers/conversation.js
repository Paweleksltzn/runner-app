const User = require('../models/user');
const Conversation = require('../models/conversation');

exports.getConversations = async function (req, res, next) {
    try {
        const user = await User.findById(req.token._id).populate('userProfile');
        const userProfile = user.userProfile;
        const userConversations = await Conversation.find({
            'members.userProfile': { $all: [userProfile] }
        }).sort({'lastEditionDate': -1}).populate('members');
        return res.json(userConversations || []);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas szukania powiadomien');
    }
}
