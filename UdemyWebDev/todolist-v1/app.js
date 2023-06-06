const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"))

const items = ["Buy Food", "Cook Food", "Eat Food"]
const workItems = []
app.get("/", function (req, res) {

    let day = date.getDate()

    res.render("list", { listTitle: day, newListItems: items })

})

app.post("/", function (req, res) {
    const newToDo = req.body.newToDo


    if (req.body.list === "Work") {
        workItems.push(newToDo)
        res.redirect("/work")
    } else {
        items.push(newToDo)
        res.redirect("/")
    }

});

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work", newListItems: workItems })
});

app.get("/about", function (req, res) {
    res.render("about")
});


app.listen(3000, function () {
    console.log("listening on 3000");
})
