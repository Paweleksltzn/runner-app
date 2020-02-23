const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsletterSubscriptionSchema = new Schema({
    email: {
        type: String,
        required: true
      },
    nameAndSurname: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('NewsletterSubscription', newsletterSubscriptionSchema);
