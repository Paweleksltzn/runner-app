const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutHistorySchema = new Schema({

  workoutsHistory: {
    trainingDate: {
      type: String, //dd-mm-yyyy
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    durationInMs: {
      type: Number,
      required: true
    },
    type: {
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
            series: [{
                repeats: Number,
                weight:Number
            }]
        }],
        required: true
      }
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

module.exports = mongoose.model('WorkoutHistory', workoutHistorySchema);
