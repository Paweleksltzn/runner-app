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
  type: {
    type: String,
    required: true
  },
  isDisplayed: {
      type: Boolean,
      required: true
  },
  creationDate: {
    type: Date,
    required: true
  },
  newFriendId: String,
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
  },
  sharedWorkoutsList: {
      type: [{
        creationDate: {
          type: Date,
          required: true
        },
        title: {
            type: String,
            required: true
          },
          author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
          },
          excercises: {
            type: [{
                name: String,
                breakTime: Number,
                series: [{
                    repeats: Number,
                    weight:Number
                }]
            }]
          }
      }]
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
