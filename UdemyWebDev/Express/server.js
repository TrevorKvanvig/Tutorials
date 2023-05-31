const express = require("express");
const app = express();

app.get("/", function(request, response){
    response.send("Hello")
})


app.get("/about", function(req,res){
    res.send("im 23")
})

app.get("/hobbies", function(req,res){
    res.send("gym")
})

app.listen(3000, function(){
    console.log("server started on 3000");
});