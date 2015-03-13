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
    res.json(body);
  });
});

module.exports = router;
