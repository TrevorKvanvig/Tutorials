const secrets = require(__dirname + "/secrets.js")
const assert = require('assert')

const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.


const uri = "mongodb+srv://Cluster91362:"+secrets.getPassword()+"@cluster91362.pghfyon.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('TestDB');
    const collection = database.collection('Fruits');
    // Query for a movie that has the title 'Back to the Future'
    collection.insertMany([
      {
        name: "Apple",
        score: 8,
        review: "Greate Fruit"
      },
      {
        name: "Apple",
        score: 8,
        review: "Greate Fruit"
      }
    ], function(err, result){
      assert.equal(err,null);
      assert.equal(2, result.result.n);
      assert.equal(2, result.ops.length)
    })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);