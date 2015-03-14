var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config.json');

// pick the data service URL from the environment
// or fallback to the value in config.json
var dataServiceURL = process.env.CONF_RAT_DATA_SERVICE_URL || config.dataServiceURL;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/index.html');
});

router.get('/sessions', function(req, res, next) {
  request(dataServiceURL, function (err, response, body) {
    if(!err) {
      res.json(body);
    } else {
      res.status(500).send(err);
    }
  });
});

router.post('/session-rating', function(req, res, next) {
  console.log("Rating session " + req.body.id);
  request({
    url: dataServiceURL,
    json: true,
    method: "post",
    body: req.body
  }, function(err, response, body) {
    if(!err) {
      console.log("Session", req.body.id, "rating done.");
      res.sendStatus(200);
    } else {
      console.log("Session", req.body.id, "rating didn't work. Error: ", err);
      res.status(500).send({ error: "The session id is probably wrong." });
    }
  });
});

module.exports = router;
