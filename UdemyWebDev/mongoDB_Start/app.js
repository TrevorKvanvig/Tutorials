const secrets = require(__dirname + "/secrets.js");
const { connectToDb, getDb } = require(__dirname + "/db.js")
const { ObjectId } = require('mongodb')
const express = require("express");
const assert = require('assert');


const app = express();
app.use(express.json())



//const uri = "mongodb+srv://Cluster91362:"+secrets.getPassword()+"@cluster91362.pghfyon.mongodb.net/?retryWrites=true&w=majority";
//const client = new MongoClient(uri);


// will hold database
let db

//this works because we set a call back function inside of get db method in db.js
connectToDb(function(err){
  // only listen for requests after connection is complete with no errors
  if(!err){
    app.listen(3000, function(){
      console.log("listening");
    })

    // set db to connected database using function from db.js
    db = getDb()
  }

})


app.get("/books", function(req, res){
  let books = []

  db.collection('books')
    .find()// returns cursor not documents
    .sort({author: 1}) // sort books alphabetiaclly by author
    .forEach(function(book){
      books.push(book) // go through every element in the cursor object returned by find and add to our book array we created
    })


    .then(function(){ // after books get added to array send books to server with 200 ok message
      res.status(200).json(books)
    })
    .catch(function() { // other wise send faluire 
      console.log("FAILED");
      res.status(500).json({error: 'could not fetch documents'})
    })
     


});

app.get("/books/:bookID", function(req, res){
  if(isValidObjectId(req.params.bookID)){ // check if string id is a valid format must be 24Hex long

    db.collection('books')
      .findOne({_id: new ObjectId(req.params.bookID)})
      .then(function(doc){ // get document with callback function once returned asyncly
        res.status(200).json(doc);
      })
      .catch(function() { // other wise send faluire 
        console.log("FAILED");
        res.status(500).json({error: 'could not fetch document'});
      })

  }else{
    res.status(500).json({error: 'Not a Valid Doc ID'});
  }
});

app.post("/books", function(req, res){
  const book = req.body

  db.collection('books').insertOne(book).then(function(result){
    res.status(201).json(result);
  }).catch(function(){
    res.status(500).json({err: "could not create doc"});
  })
})

app.delete("/books/:bookID", function(req,res){
  
  if(isValidObjectId(req.params.bookID)){ // check if string id is a valid format must be 24Hex long

    db.collection('books')
      .deleteOne({_id: new ObjectId(req.params.bookID)})
      .then(function(resuslt){ // gets sucess delete message
        res.status(200).json(resuslt);
      })
      .catch(function() { // other wise send faluire 
        console.log("FAILED");
        res.status(500).json({error: 'could not Delete document'});
      })

  }else{
    res.status(500).json({error: 'Not a Valid Doc ID'});
  }
})

app.patch("/books/:bookID", function(req,res){ // used to update fields
  const updates = req.body
  if(isValidObjectId(req.params.bookID)){ // check if string id is a valid format must be 24Hex long
    
    db.collection('books')
      .updateOne({_id: new ObjectId(req.params.bookID)}, {$set: updates})
      .then(function(resuslt){ // gets sucess delete message
        res.status(200).json(resuslt);
      })
      .catch(function() { // other wise send faluire 
        console.log("FAILED");
        res.status(500).json({error: 'could not Update document'});
      })

  }else{
    res.status(500).json({error: 'Not a Valid Doc ID'});
  }
})


function isValidObjectId(id){
     
  if(ObjectId.isValid(id)){
      if((String)(new ObjectId(id)) === id)
          return true;       
      return false;
  }
  return false;
}
