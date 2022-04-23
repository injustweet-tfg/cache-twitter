const express = require("express");
const dbo = require("../db/conn");

// The router will be added as a middleware and will take control of requests starting with path /.
const router = express.Router();

// List of tweets between two dates
router.route("/").get(function (req, res) {
  let db_connect = dbo.getDb("twitter");
  let date_start = parseInt(req.query.dateStart);
  let date_end = parseInt(req.query.dateEnd);
  db_connect
    .collection("tweets_ipfs")
    .find({ date: { $gt: date_start, $lt: date_end } }) 
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

router.route("/add").post(function (req, response) {
  let db_connect = dbo.getDb("twitter");
  db_connect.collection("tweets_ipfs").insertMany(req.body, function (err, res) {
    if (err) throw err;
    response.json(res);
    console.log("Tweets added successfully");
  });
});

router.route("/delete").delete((req, response) => {
  let db_connect = dbo.getDb("twitter");
  db_connect.collection("tweets_ipfs").deleteMany({}, function (err, obj) {
    if (err) throw err;
    console.log("All document deleted");
    response.json(obj);
  });

});


router.route("/search").get(function (req, res) {
  let db_connect = dbo.getDb("twitter");
  let user_name = req.query.user;
  let date_start = parseInt(req.query.dateStart);
  let date_end = parseInt(req.query.dateEnd);
  db_connect
    .collection("tweets_ipfs")
    .find({ date: { $gt: date_start, $lt: date_end }, user: user_name }) 
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});


router.route("/words").get(function (req, res) {
  let db_connect = dbo.getDb("twitter");
  let word = req.query.word;
  db_connect
    .collection("tweets_ipfs")
    .find({"text" : {$regex : word}})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = router;