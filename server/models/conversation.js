const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    members: [{
        userProfile: {
            type: Schema.Types.ObjectId,
            ref: 'UserProfile',
            required: true
        },
        isReaded: Boolean
    }],
    lastEditionDate: {
        type: Date,
        required: String
    },
    messages: [
        {
            author: {
                type: Schema.Types.ObjectId,
                ref: 'UserProfile',
                required: true
            },
            content: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Conversation', conversationSchema);
