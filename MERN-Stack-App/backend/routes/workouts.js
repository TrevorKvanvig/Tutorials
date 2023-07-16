const express = require('express')
const Workout = require('../models/workoutModel')
const router = express.Router()
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController')


//=========Routes===================
//http://localhost:3000/api/workouts/
router.route('/')
  .get(getWorkouts) // uses get Workouts from controller.js
  //POST
  .post(createWorkout) // uses create workout from workout controller.js
  
//http://localhost:3000/api/workouts/:id
router.route('/:id')
  .get(getWorkout) // uses getworkout from workout controller.js
  .delete(deleteWorkout)
  .patch(updateWorkout);

module.exports = router;