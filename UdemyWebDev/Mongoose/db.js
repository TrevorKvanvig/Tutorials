const mongoose = require("mongoose");
const db = require(__dirname + "/secrets.js")

const uri = 'mongodb://localhost:27017/fruits';
let dbConnection
