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

router.route("/words").get(function (req, res) {
  let db_connect = dbo.getDb("twitter");

  let word = req.query.word;
  let date_start = parseInt(req.query.dateStart);
  let date_end = parseInt(req.query.dateEnd);
  let order = parseInt(req.query.order); //0 - date desc(-1), 1 - date asc(1), 2 - rt desc(-1), 3 - fav desc(-1)

  let textuser =  word[0] == "@" ? "user" : "text"
  let nameVariable = (order == 0 || order == 1) ? "date" : ((order == 2) ? "retweets" : "likes");
  let ascdesc = (order == 1) ? 1 : -1;
  value = word[0] == "@" ? word.slice(1) : { $regex: word };

  var query = {}
  query['date']={ $gt: date_start, $lt: date_end } ;
  query[textuser] = value;

  var query_sort = {};
  query_sort[nameVariable] = ascdesc;

  console.log(query)
  console.log(query_sort)
  db_connect
    .collection("tweets_ipfs")
    .find(query)
    .sort(query_sort)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = router;