//===== Requirements =========
const { connectToDb, getDb, getDbName } = require(__dirname + '/db.js');
const express = require('express');
const ejs = require('ejs')
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
//====== Express Setup =======
const app = express();
app.set('veiw engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

//====== Globals =============
let db;
const defaultArticle = {
  title: 'this is default article title',
  content: 'this is default article content'
};
let articlesRetrieved = [];
//====== Functions ===========
// uses mongoDb and returns true if id is formatted correctly
function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if ((String)(new ObjectId(id)) === id)
      return true;
    return false;
  }
  return false;
};

function getAllArticles(res) {
  db.collection('articles').find()
    .forEach(function(article) {
      articlesRetrieved.push(article)
    }).then(function() {
      res.status(200).send(articlesRetrieved);
    }).catch(function() {
      res.status(500);
      console.log('Unable to retreive articles from database', getDbName());
    })
    
}

function getOneArticle(aID, res){
  const articleID = new ObjectId(aID)
  let articleToRespond = {
    title: 'null',
    content: 'null'
  }
  if(isValidObjectId(aID)){
    db.collection('articles').findOne({ _id: articleID })
    .then(function(result) {
      articleToRespond.title = result.title
      articleToRespond.content = result.content
      console.log(articleToRespond);
      res.send(articleToRespond)
    }).catch(function(){
      console.log('could not find article with id', articleID);
      res.status(500).json({error: 'could not fetch document'});
    });

  } else{
    console.log('Article ID not in correct Format');
  }
}

function sendArticleToDB(jsonObject, res) {
  db.collection('articles').insertOne(jsonObject)
    .then(function(response) {
      res.status(201).send(response);

    }).catch(function() {
      console.log('could not add document to ' + getDbName());
      res.status(500);
    })
}

function replaceArticle(aID, jsonToReplace, res) {
  const articleID = new ObjectId(aID)
  db.collection('articles').updateOne({ _id: articleID }, {$set: jsonToReplace})
    .then(function(result) {
      res.send(result)

    }).catch(function() {
      console.log("undable to update");
    })
}

function deleteArtcleInDB(aID, res) {

}

//====== RESTful Requests ====
connectToDb(function(err) {
  if(!err){
    db = getDb()
    app.listen(3000, function(){
      console.log("listening to 3000");
    })
  }else {
    console.log('Could not connect to Database in app.js with name', getDbName());
  }
});

app.get('/', function(req,res){
  res.send('Welcome to the API');
});

app.route('/articles')
  .get(function(req,res){
    getAllArticles(res);

    // reset local storage
    articlesRetrieved = []

  })
  .post(function(req, res) {
    // this works when posting using x-www-form-urlencoded
    // sending title and content as keys
    const reqTitle = req.body.title
    const reqContent = req.body.content

    const newArticle = {
      title: reqTitle, 
      content: reqContent
    };

    sendArticleToDB(newArticle, res);

  })
  .delete(function(req,res) {
    db.collection('articles').deleteMany()
      .then(function(result) {
        res.send(result);
      }).catch(function() {
        console.log('unable to delete all items in', getDbName());
      })
  }); 

app.route('/articles/:mongoID')
  .get(function(req, res) {
    const articleID = req.params.mongoID;
    getOneArticle(articleID, res);
  })
  .put(function(req, res) {
    const articleID = req.params.mongoID;
    const reqTitle = req.body.title
    const reqContent = req.body.content

    const newArticle = {
      title: reqTitle, 
      content: reqContent
    };

    replaceArticle(articleID, newArticle, res)
  })
  .patch(function(req, res) {
    console.log(req.body)
    const articleID = req.params.mongoID;

    replaceArticle(articleID, req.body, res)
  })
  .delete(function(req, res) {
    const articleID = new ObjectId(req.params.mongoID)
    if (isValidObjectId(req.params.mongoID)){
      db.collection('articles').deleteOne({_id: articleID})
        .then(function(result) {
          res.send(result);
        }).catch(function() {
          console.log('unable to delete all items in', getDbName());
        })
    }else {
      console.log('not valid id');
    }
    
  })
  
