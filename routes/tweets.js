const express = require("express");
const dbo = require("../db/conn");

// The router will be added as a middleware and will take control of requests starting with path /.
const router = express.Router();

// List of tweets between two dates
router.route("/").get(function (req, res) {
    let db_connect = dbo.getDb("twitter");
    console.log(db_connect);
    // let user_name = req.query.user;
    let date_start = parseInt(req.query.dateStart);
    let date_end = parseInt(req.query.dateEnd);
    db_connect
        .collection("tweets_v1")
        // .find({ user: user_name })
        .find({ date: { $gt: date_start, $lt: date_end } })
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});


module.exports = router;