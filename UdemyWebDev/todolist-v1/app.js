const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.send("hi 3000");
})

app.listen(3000, function(){
    console.log("listening on 3000");
})