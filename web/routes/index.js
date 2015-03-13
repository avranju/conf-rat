var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/index.html');
});

router.get('/sessions', function(req, res, next) {
  request(config.dataServiceURL, function (err, response, body) {
    if(!err) {
      res.json(body);
    } else {
      res.status(500).send(err);
    }
  });
});

router.post('/session-rating', function(req, res, next) {
  request({
    url: config.dataServiceURL,
    json: true,
    method: "post",
    body: req.body
  }, function(err, response, body) {
    if(!err) {
      res.sendStatus(200);
    } else {
      res.status(500).send({ error: "The session id is probably wrong." });
    }
  });
});

module.exports = router;
