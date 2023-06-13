//===========Requirements===========
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const contents = require(__dirname + "/contents.js")
const { connectToDb, getDb, getDbName } = require(__dirname + "/db.js")
const lodash = require('lodash');
const { ObjectId } = require("mongodb")


//===========Set App===========
// access express functionality through app var
const app = express();

// allows express to render ejs files
app.set('view engine', 'ejs');

// allows express to use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// allows express to use css files before loading site in "public folder"
app.use(express.static("public"));

//===========Globals===========
let posts = []
let db


//===========Functions===========
// uses mongoDb and returns true if id is formatted correctly
function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id)
      return true;
    return false;
  }
  return false;
};

function addToDatabase(valToAdd, res) {
  // go into blogposts collection and insert value
  db.collection('BlogPosts').insertOne(valToAdd)
    .then(function (result) {
      res.status(201)
    }).catch(function () {
      console.log('could not add document to ' + getDbName());
      res.status(500)
    })
};

function getFromDatabase(res) {
  const HSC = contents.homeStartingContent();
  // get every document from database
  db.collection('BlogPosts').find()
    // go through every element
    .forEach(function(post) {
      //place into global post array
      posts.push(post)
    }).then(function () {
      // render home page with posts array
      res.status(200).render("home", { startContent: HSC, posts: posts })
    }).catch(function () {
      // else failure
      console.log("FAILED");
      res.status(500)
    })
  // clear posts array for next load
  posts = []
}

function getPost(postId, res) {
  // format id for mongo db ex: Object(6488d8e67fb1e953e3eb7265)
  postObjID = new ObjectId(postId)

  // if id could be found
  if (isValidObjectId(postId)) {
    // search database with same id
    db.collection('BlogPosts').findOne({ _id: postObjID })

      //if found
      .then(function (result) {
        // render post.ejs with post items from database
        res.render('post', { postTitle: result.postTitle, postBody: result.postBody })
      }).catch(function () {
        console.log("Did not find ID");
      })
  } else {
    console.log('post id not in correct format');
  }
}


//===========Body===========
//establish connection to DB
connectToDb(function (err) {
  // if no errors while connecting
  if (!err) {
    //set global database to one connected to form db.js
    db = getDb()
    console.log('Successfuly connected app.js to db');

    // start site and allow listening w=oce database connection is established
    app.listen(3000, function () {
      console.log("Server started on port 3000");
    });

  } else {
    // if errors while connecting
    console.log('app unable to start becasue database not connected');
  }
});


app.get("/", function (req, res) {
  // use function to load home.ejs with posts in database
  getFromDatabase(res)
});

app.get("/about", function (req, res) {
  const ASC = contents.aboutContent();
  res.render("about", { startContent: ASC });
});

app.get("/contact", function (req, res) {
  const CSC = contents.contactContent();
  res.render("contact", { startContent: CSC });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:id", function (req, res) {
  // gets id from home.ejs
  postId = req.params.id

  // look in database through function with same id
  getPost(postId, res)
});

app.post("/compose", function (req, res) {
  // create json object to add
  const newPost = {
    postTitle: req.body.newPostTitle,
    postBody: req.body.newPostBody
  }

  // add json object to database using function
  addToDatabase(newPost, res)
  // after adding redirect to home page updating page with new post
  res.redirect("/")
});