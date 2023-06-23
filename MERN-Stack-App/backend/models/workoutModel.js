const mongoose = require('mongoose');

const Schema = mongoose.Schema

//Define structure of document
const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
}, {timestamps: true});

// whenever this is exported and used it will go into workout collection and require schema we declared
module.exports = mongoose.model('Workout', workoutSchema)