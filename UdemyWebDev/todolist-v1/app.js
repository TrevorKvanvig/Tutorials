//==================== Requirements ====================
const { connectToDb, getDb, getDbName } = require(__dirname + "/db.js")
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const ejs = require("ejs");
const app = express();
const { ObjectId } = require("mongodb")

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
}

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
    

    // go into connected database in a collection called toDos
    db.collection('Lists/' + custListName).find().forEach(item => {
        // find each item and add it to items array
        items.push(item)
    }).then(function(){
        
        if(items.length === 0){
            // if there are no items in the data base render list.ejs with default global items
            res.status(200).render("list", { listTitle: custListName, newListItems: defaultItems })
        }else{
            // when successful 
            // render html page with items from database added in for each loop
            res.status(200).render("list", { listTitle: custListName, newListItems: items })
        }
        
    }).catch(function(){
        // else failure
        console.log("FAILED");
        res.status(500)
    })
    console.log(items);

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
    // create json object to add to database
    const newToDo = {
        name: req.body.newToDo
    }
    if(req.body.list === date.getDate()){
        // go to the todos collection and insert created json object
        db.collection('Lists/toDos').insertOne(newToDo)
            // then sucellfully added
            .then(function(result){
                res.status(201)
            }).catch(function(){
                // else did not add
                console.log('could not add document to ' + getDbName());
                res.status(500)
        })
    }else{
        // go to the todos collection and insert created json object
        db.collection('Lists/' + req.body.list ).insertOne(newToDo)
            // then sucellfully added
            .then(function(result){
                res.status(201)
            }).catch(function(){
                // else did not add
                console.log('could not add document to ' + getDbName());
                res.status(500)
            });
    }
    

    // redirect back to home page where new item will be loaded becasue it will now be in database
    if (req.body.list === date.getDate()){
        res.redirect("/")
    }else{
        res.redirect("/" + req.body.list)
    }
    
    

});



app.post("/delete", function (req, res) {
    idToDelete = req.body.checkbox

    // if Mongo ID is of correct format
    if(isValidObjectId(idToDelete)){

        // go to todos collection and delete id of checkbox item 
        db.collection('Lists/toDos').deleteOne({_id: new ObjectId(idToDelete)})
            // once deleted
            .then(function(result){
                // redirect to home route with updated database
                console.log("Sucsessfully Deleted Document with ID ", idToDelete);
                res.status(200).redirect("/")
                
            }).catch(function(){
                // if faliure
                console.log("Failed To Delete Item with ID of ", idToDelete);
                res.status(500)
            })
    }else{
        // if Mongo ID is not correct format
        res.status(500)
        console.log("ERROR: Not Valid Doc ID");
    }
    
});





