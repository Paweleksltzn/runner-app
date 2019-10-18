const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isMale: {
    type: Boolean,
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
  accessLevel: {
    type: Number,
    required: true
  },
  confirmationToken:  String,
  isActive: Boolean,

});

module.exports = mongoose.model('User', userSchema);