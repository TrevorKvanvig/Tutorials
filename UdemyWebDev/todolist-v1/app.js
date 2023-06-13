//==================== Requirements ====================
const { connectToDb, getDb, getDbName } = require(__dirname + "/db.js")
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const ejs = require("ejs");
const app = express();
const { ObjectId } = require("mongodb")
var _ = require('lodash');

//==================== Express setters ====================
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"))

//==================== Globals ====================
//"Buy Food", "Cook Food", "Eat Food"
// used to store items from database to display in ejs files
let items = []

// default items if there is no current to do in database
const defaultItems = [
    {name: "Welcome to the To Do List"},
    {name: "Press + to add an item"}, 
    {name: "Press <- to delete"}
]

// global variable for databse connected to
let db

//=========== Functions ===========
function isValidObjectId(id){
     
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
};

function addToDb(dbName, valToAdd, res) {
    // go to the todos collection and insert created json object
    db.collection('Lists/' + dbName).insertOne(valToAdd)
        // then sucellfully added
        .then(function(result){
            res.status(201)
        }).catch(function(){
            // else did not add
            console.log('could not add document to ' + getDbName());
            res.status(500)
    })
};

function removeFromDb(dbName, valToDelete, res) {
    db.collection('Lists/' + dbName).deleteOne({_id: new ObjectId(valToDelete)})
        // once deleted
        .then(function(result){
            // redirect to home route with updated database
            console.log("Sucsessfully Deleted Document with ID ", valToDelete);
            res.status(200)
                
        }).catch(function(){
            // if faliure
            console.log("Failed To Delete Item with ID of ", valToDelete);
            res.status(500)
        });
};

function getFromDb(name, res) {
    // go into connected database in a collection called toDos
    db.collection('Lists/' + name).find().forEach(item => {
        // find each item and add it to items array
        items.push(item)
    }).then(function(){
        
        if(items.length === 0){
            // if there are no items in the data base render list.ejs with default global items
            res.status(200).render("list", { listTitle: _.upperFirst(name), newListItems: defaultItems })
        }else{
            // when successful 
            // render html page with items from database added in for each loop
            res.status(200).render("list", { listTitle: _.upperFirst(name), newListItems: items })
        }
        
    }).catch(function(){
        // else failure
        console.log("FAILED");
        res.status(500)
    })

    items = []
};










//=========== Body ===========
// SET UP ACCESS
//establish connection to DB
connectToDb(function(err){
  // if no errors while connecting
  if(!err){
    //set global database to one connected to form db.js
    db = getDb()
    console.log('Successfuly Connected app.js to database on Mongo Atlas Titled: "' + getDbName()+'"');

    // start site and allow listening w=oce database connection is established
    app.listen(3000, function() {
      console.log("Server started on port 3000");
      
    });

  }else{  
    // if errors while connecting
    console.log('app unable to start becasue database not connected');
  }
});

// AFTER ACCESS IS SET UP
app.get("/:customListName", function (req, res) {
    const custListName = req.params.customListName

    // uses function to get items in database with name and loads them into front end
    getFromDb(custListName, res);

    // reset items to empty so when site gets reloaded only database memory will keep track of to dos
    items = []


});

app.get("/", function (req, res) {

    // get current day from day.js function
    let day = date.getDate()

    // go into connected database in a collection called toDos
    db.collection('Lists/toDos').find().forEach(item => {
        // find each item and add it to items array
        items.push(item)
    }).then(function(){
        
        if(items.length === 0){
            // if there are no items in the data base render list.ejs with default global items
            res.status(200).render("list", { listTitle: day, newListItems: defaultItems })
        }else{
            // when successful 
            // render html page with items from database added in for each loop
            res.status(200).render("list", { listTitle: day, newListItems: items })
        }
        
    }).catch(function(){
        // else failure
        console.log("FAILED");
        res.status(500)
    })
    console.log(items);

    // reset items to empty so when site gets reloaded only database memory will keep track of to dos
    items = []

})

app.post("/", function (req, res) {
    title = req.body.list
    // create json object to add to database
    const newToDo = {
        name: req.body.newToDo
    }

    // if title is for home directory
    if(title === date.getDate()){
        // add value to this database
        addToDb('toDos', newToDo, res)
        res.redirect('/')
    } else {
        addToDb(_.lowerCase(title), newToDo, res)
        res.redirect("/" + _.lowerCase(title))
    }
});

app.post("/delete", function (req, res) {
    const idToDelete = req.body.checkbox
    const title = req.body.listTitle

    
    // if Mongo ID is of correct format
    if(isValidObjectId(idToDelete)){

        if(title === date.getDate()){
            removeFromDb('toDos', idToDelete, res)
            res.redirect("/")
        }else{
            removeFromDb(_.lowerCase(title), idToDelete, res)
            res.redirect("/" + _.lowerCase(title))
        }
        
    }else{
        // if Mongo ID is not correct format
        res.status(500)
        console.log("ERROR: Not Valid Doc ID");
    }
    
});





