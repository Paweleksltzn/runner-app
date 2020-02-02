const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutListSchema = new Schema({
  workoutsList: {
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
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
});

module.exports = mongoose.model('WorkoutList', workoutListSchema);
