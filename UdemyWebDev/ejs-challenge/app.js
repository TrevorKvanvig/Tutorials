//===========Requirements===========
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const contents = require(__dirname + "/contents.js")
const { connectToDb, getDb } = require(__dirname + "/db.js")
const lodash = require('lodash');


//===========Set App===========
// access express functionality through app var
const app = express();

// allows express to render ejs files
app.set('view engine', 'ejs');

// allows express to use body parser
app.use(bodyParser.urlencoded({extended: true}));

// allows express to use css files before loading site in "public folder"
app.use(express.static("public"));

//===========Globals===========
const posts = []
let db


//===========Body===========
//establish connection to DB
connectToDb(function(err){
  // if no errors while connecting
  if(!err){
    //set global database to one connected to form db.js
    db = getDb()
    console.log('Successfuly connected app.js to db');

    // start site and allow listening w=oce database connection is established
    app.listen(3000, function() {
      console.log("Server started on port 3000");
    });

  }else{  
    // if errors while connecting
    console.log('app unable to start becasue database not connected');
  }
});


app.get("/", function(req, res){
  const HSC = contents.homeStartingContent();
  res.render("home", {startContent: HSC,
    posts: posts
  });
});

app.get("/about", function(req, res){
  const ASC = contents.aboutContent();
  res.render("about", {startContent: ASC});
});

app.get("/contact", function(req, res){
  const CSC = contents.contactContent();
  res.render("contact", {startContent: CSC});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/posts/:title", function(req, res){
  const requestTitle = lodash.lowerCase(req.params.title);

  posts.forEach(function(post){
    if(lodash.lowerCase(post.postTitle) === requestTitle){
      res.render("post", {
        postTitle: post.postTitle,
        postBody: post.postBody
      })
    }
  });
});

app.post("/compose", function(req, res){
  const newPost = {
    postTitle: req.body.newPostTitle,
    postBody: req.body.newPostBody
  }
  posts.push(newPost)
  res.redirect("/")
});