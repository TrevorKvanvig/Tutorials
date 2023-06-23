const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({createdAt: -1})

  res.status(200).json(workouts)
}

//get a single workout
const getWorkout = async (req,res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){ // if not valid mongo ID
    return res.status(404).json({error: 'Not MongoDB Id Fromat'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

//create a new workout
const createWorkout = async (req,res) => {
  const {title, weight, reps} = req.body;

  // if there is an error most likey it didnt follow Schema so catch and handle error
  try {
    // create document with passed in post request using Schema
    const workout = await Workout// this is async so to make function wait till this is completed use await and async
      .create({
        title,
        weight,
        reps
      }) 
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//delete a workout
const deleteWorkout = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){ // if not valid mongo ID
    return res.status(404).json({error: 'Not MongoDB Id Fromat'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}


// update a workout
const updateWorkout = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){ // if not valid mongo ID
    return res.status(404).json({error: 'Not MongoDB Id Fromat'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  
  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}




module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
}