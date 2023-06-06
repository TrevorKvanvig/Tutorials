const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); 
app.use(express.static("public"))

var items = ["Buy Food", "Cook Food", "Eat Food"]
var workItems = []
app.get("/", function (req, res) {

    var today = new Date()
    
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: day, newListItems: items})
    
})

app.post("/", function(req,res){
    var newToDo = req.body.newToDo
    console.log(req.body)
    if(req.body.list === "Work"){
        workItems.push(newToDo)
        res.redirect("/work")
    }else{
        items.push(newToDo)
        res.redirect("/")
    }
    
});

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work", newListItems: workItems})
});

app.get("/about", function(req,res){
    res.render("about")
});


app.listen(3000, function () {
    console.log("listening on 3000");
})
