const { MongoClient, ServerApiVersion } = require("mongodb");
const Db = process.env.ATLAS_URI; // Security layer
const client = new MongoClient(Db, { // Client of our data base
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) { // Connection to the data base
            if (db) { // Verify we got a good "db" object
                console.log(Db);
                _db = db.db("twitter");
                console.log("Successfully connected to MongoDB.");
            }
            else {
                console.log("Error connecting to MongoDB.");
                console.log(Db);
            }
            return callback(err);
        });
    },

    getDb: function () { // Client used to interact with the data base
        return _db;
    },
};