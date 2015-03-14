var express = require('express');
var router = express.Router();
var locator = require('../locator');
var dataService = locator.getDataService();

var dataServiceInitialized = false;
dataService.init(function(err) {
  dataServiceInitialized = !err;
});

router.get('/', function(req, res, next) {
  dataService.getSessionsList(function(err, sessions) {
    if(err) {
      return res.status(500);
    }
    res.json(sessions);
  });
});

router.post('/', function(req, res, next) {
  var input = req.body;

  dataService.rateSession(input.id, input.rating, input.comment, function(err) {
    res.status(!err ? 200 : 500);
  });
});

module.exports = router;
