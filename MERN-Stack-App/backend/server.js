//==========Requirements=============
const express = require('express');
require('dotenv').config()
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
//==========App Setup=============
const app = express()

//any request that has a body it will attach to request object
// allows req.body to be used
app.use(express.json())

//function will require for every request that comes in
app.use((req, res, next) => {
  // every request that comes in log it
  console.log(req.path, req.method);

  // need to call this or app will never move on after log
  next();
})

// this uses routs declared in workouts.js and wors like app.get() app.post() to specific routes
// will fire when http://localhost:3000/api/workouts is called
app.use('/api/workouts', workoutRoutes)
//==========Functions=============

//==========Body=============
mongoose.connect(process.env.MONGO_URI)
  .then(() => { // once connected
    console.log('Connected To DB');

    //Listen for requests only when db is connected
    app.listen(process.env.PORT, (req, res) => {
      console.log('listening on 3000');
    });
  })
  .catch(() => {
    console.log('Cant connect to db');
  })


