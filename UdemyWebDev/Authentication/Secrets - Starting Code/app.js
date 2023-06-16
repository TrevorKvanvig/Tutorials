const bodyParser = require('body-parser');
const express = require('express');
const ejs = require('ejs');
const { connectToDb, getDb, getDbName } = require(__dirname + '/db.js');
const { ObjectId } = require('mongodb');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let db

function sendToDB(jsonObject, res) {
  db.collection('Users').insertOne(jsonObject)
    .then(function (response) {
      res.status(201).render('secrets');

    }).catch(function () {
      console.log('could not add document to ' + getDbName());
      res.status(500);
    })
}

function authenticate(uname, password, res) {
  db.collection('Users').findOne({ email: uname })
    .then(function (result) {
      if(result.password === password){
        res.render('secrets')
      }else {
        res.send('passowrd invalid')
      }
    }).catch(function () {
      res.status(500).json({ error: 'Email not found' });
    });
}


// render home page
app.get('/', function (req, res) {
  res.render('home')
})

// render login page
app.get('/login', function (req, res) {
  res.render('login')
})

// render register page
app.get('/register', function (req, res) {
  res.render('register')

})

// when someone registers
app.post('/register', function (req, res) {
  // create them as a new user
  const newUser = {
    email: req.body.username,
    password: req.body.password
  }
  sendToDB(newUser, res)
})

// when someone logs in authenticate them
app.post('/login', function (req, res) {
  const username = req.body.username
  const password = req.body.password
  authenticate(username,password,res)
})

// connect to database and listen to port
connectToDb(function (err) {
  if (!err) {
    db = getDb()

    app.listen(3000, function () {
      console.log('3000');
    })
  }
})
