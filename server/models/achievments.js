const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const achievmentsSchema = new Schema({
    icon: {
        type: String,
        required: true
      },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Achievment', achievmentsSchema);
