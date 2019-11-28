const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  dateString: {
    type: String,
    required: true
  },
  isDisplated: {
      type: Boolean,
      required: true
  },
  receivers: [ {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('NotificationSchema', notificationSchema);
