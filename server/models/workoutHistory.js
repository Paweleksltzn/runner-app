const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutHistorySchema = new Schema({
  trainingDate: {
    type: String, //dd-mm-yyyy
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  owner: {
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
});

module.exports = mongoose.model('WorkoutHistory', workoutHistorySchema);
