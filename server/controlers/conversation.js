const User = require('../models/user');
const UserProfile = require('../models/userProfile');
const Conversation = require('../models/conversation');
const socketEvents = require('../util/socketEvents');

exports.getConversations = async function (req, res, next) {
    try {
        const user = await User.findById(req.token._id).populate('userProfile');
        const userProfile = user.userProfile;
        const userConversations = await Conversation.find({
            'members.userProfile': { $all: [userProfile] }
        }).sort({'lastEditionDate': -1}).populate('members.userProfile');
        return res.json(userConversations || []);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas szukania powiadomien');
    }
}

exports.createConversation = async function (req, res, next) {
    try {
        const user = await User.findById(req.token._id).populate('userProfile');
        const targetUser = await User.findOne({
            email: req.body.targetProfileEmail
        }).populate('userProfile');
        const conversation = new Conversation({
            members: [
                {
                    userProfile: user.userProfile,
                    isReaded: true
                },
                {
                    userProfile: targetUser.userProfile, 
                    isReaded: false
                }
            ],
            lastEditionDate: new Date(),
            messages: [{
                author: user.userProfile,
                content: req.body.newMessage
            }]
        });
        const io = require('../util/socket').getIO();
        io.to(targetUser._id).emit(socketEvents.newConversation, conversation);
        conversation.save();
        return res.json(conversation);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas szukania powiadomien');
    }
}


exports.newMessage = async function (req, res, next) {
    try {

        return res.json({});
    } catch (err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas szukania powiadomien');
    }
}

exports.displayConversation = async function (req, res, next) {
    try {
        const conversation = await Conversation.findById(req.body.conversationId);
        conversation.members.forEach(member => member.isReaded = true);
        conversation.save();
        return res.json({});
    } catch (err) {
        console.log(err);
        return res.status(500).send('Wystąpił błąd podczas szukania powiadomien');
    }
}
