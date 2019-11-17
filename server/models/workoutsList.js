const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutListSchema = new Schema({
  workoutsList: {
      type: [{
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
            }]
          }
      }]
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('WorkoutList', workoutListSchema);