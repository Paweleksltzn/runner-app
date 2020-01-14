const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    isMale: {
        type: Boolean,
        required: true
    },
    accessLevel: {
        type: Number,
        required: true
    },
    gradient: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    profileDescription: {
        type: String,
        required: String
    },
    invitedToFriends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendsInvitations: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
        
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('UserProfile', userProfileSchema);