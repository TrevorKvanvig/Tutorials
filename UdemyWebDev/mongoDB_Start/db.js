const { MongoClient } = require('mongodb')
let dbConnection

module.exports = {
  //cb is call back function
  connectToDb: function(cb){
    MongoClient.connect('mongodb://localhost:27017/bookstore')
    

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