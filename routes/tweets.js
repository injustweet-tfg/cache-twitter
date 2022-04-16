const express = require("express");
const dbo = require("../db/conn");

// The router will be added as a middleware and will take control of requests starting with path /.
const router = express.Router();

// List of tweets between two dates
router.route("/").get(function (req, res) {
  let db_connect = dbo.getDb("twitter");
  // console.log(db_connect);
  // let user_name = req.query.user;
  let date_start = parseInt(req.query.dateStart);
  let date_end = parseInt(req.query.dateEnd);
  db_connect
    .collection("tweets_ipfs")
    // .find({ user: user_name })
    .find({ date: { $gt: date_start, $lt: date_end } })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});



// This section will help you create a new record.
router.route("/add").post(function (req, response) {
  let db_connect = dbo.getDb("twitter");
  db_connect.collection("tweets_ipfs").insertMany(req.body, function (err, res) {
    if (err) throw err;
    response.json(res);
    console.log("Tweets added successfully");
  });
});

// This section will help you delete
router.route("/delete").delete((req, response) => {
  let db_connect = dbo.getDb("twitter");
  db_connect.collection("tweets_ipfs").deleteMany({}, function (err, obj) {
    if (err) throw err;
    console.log("All document deleted");
    response.json(obj);
  });

});

/*
  await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }

 async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE"
    });

*/

module.exports = router;