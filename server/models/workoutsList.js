const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutListSchema = new Schema({
  workoutsList: {
      type: [{
        title: {
            type: String,
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
      }],
      required: true
  }
});

module.exports = mongoose.model('WorkoutList', workoutListSchema);
