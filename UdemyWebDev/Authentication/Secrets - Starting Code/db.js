const secrets = require(__dirname + '/secrets.js');
const { MongoClient } = require('mongodb')

let dbConnection
const dbName = 'Authentication'
const uri = "mongodb+srv://Cluster91362:"+secrets.getPassword()+"@cluster91362.pghfyon.mongodb.net/"+dbName+"?retryWrites=true&w=majority"

module.exports = {
  connectToDb: function(callback) {
    MongoClient.connect(uri).then(function(client) {
      dbConnection = client.db();

      return callback();
    }).catch(function(err) {

      console.log('ERROR: cant connect to DB with name: ', dbName);
      return callback(err);
    });

  },

  getDb: function() {
    if(!dbConnection) {
      console.log("No current DB connection");
    }else {
      return dbConnection
    }
  },

  getDbName: function() {
    return dbName
  }
} 