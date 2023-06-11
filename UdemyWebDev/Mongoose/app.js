//const express = require('express');
const mongoose = require("mongoose");
const { connectToDb, getDb } = require(__dirname + "/db.js")
//const app = express();
const uri = 'mongodb://localhost:27017/fruitsDB';
mongoose.connect(uri);

const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
})

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Preety Solid"
})

//fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age: Number
})
const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: 'John',
  age: 37
})

//person.save()


const orange = new Fruit({
  name: "Orange",
  rating: 7,
  review: "Preety Solid"
})

const banana = new Fruit({
  name: "Bannana",
  rating: 7,
  review: "Preety Solid"
})

Fruit.insertMany([orange, banana])

// app.listen(3000, function(){
//   console.log("listening");
// })
let fruits = []
Fruit.find({})