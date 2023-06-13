const { MongoClient } = require('mongodb')
const secrets = require(__dirname + "/secrets.js");
let dbConnection
// const uri = 'mongodb://localhost:27017/bookstore'
const uri = "mongodb+srv://Cluster91362:"+secrets.getPassword()+"@cluster91362.pghfyon.mongodb.net/Bookstore?retryWrites=true&w=majority"
module.exports = {
  //cb is call back function
  connectToDb: function(cb){
    
    MongoClient.connect(uri)
    

      .then(function(client){
        dbConnection = client.db()

        // pass nothing if connected sucess
        return cb()
      }).catch(function(err){
        console.log("could not connect to db...=>",err);
        // pass an error object if failed to connect
        return cb(err)
      })
  },


  getDb: function(){
    return dbConnection
  }   
}