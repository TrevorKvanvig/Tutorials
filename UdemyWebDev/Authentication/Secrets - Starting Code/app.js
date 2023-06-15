const bodyParser = require('body-parser');
const express = require('express');
const ejs = require('ejs');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req,res) {
  res.render('home')
})
app.get('/login', function(req,res) {
  res.render('login')
})
app.get('/register', function(req,res) {
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  res.render('register')
})

app.listen(3000, function() {
  console.log('3000');
})