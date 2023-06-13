const {MongoClient} = require("mongodb")
const secrets = require(__dirname + '/secrets.js')
let dbName = 'BlogSite'
const uri = "mongodb+srv://Cluster91362:"+secrets.getPassword()+"@cluster91362.pghfyon.mongodb.net/"+dbName+"?retryWrites=true&w=majority"
let dbConnection

module.exports = {
  connectToDb: function(callBack){
    MongoClient.connect(uri)
    .then(function(client){
      // set database retruned to variable dbConnection
      dbConnection = client.db()
      //retrun a empty callback function signifying success
      return callBack()

    }).catch(function(err){
      //display error
      console.log("Unable to connect to DataBase");
      //retrun callback function with error message
      return callBack(err)

    })
  },

  getDb: function(){
    
    // if the database does not exists
    if(!dbConnection){
      console.log("No current DB connection");

    }else{
      // if database exists
      // give the database that has been connected to back
      return dbConnection
    }
    
  },

  getDbName: function(){
    return dbName;
  }
}