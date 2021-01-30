const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "DBURL";

// Database Name
const dbName = "DBNAME";

module.exports = callback => {
  // Create a new MongoClient
  const client = new MongoClient(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  // Use connect method to connect to the Server
  client.connect(function(err) {
    assert.equal(null, err);
    const db = client.db(dbName);

    callback(db);
  });
};
