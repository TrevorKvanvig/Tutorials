const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const contents = require(__dirname + "/contents.js")
const lodash = require('lodash');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = []


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










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
