var express = require('express');
var router = express.Router();
var locator = require('../locator');
var dataService = locator.getDataService();

router.get('/', function(req, res, next) {
  res.json(dataService.getSessionsList());
});

router.post('/', function(req, res, next) {
  var input = req.body;
  var saved = dataService.rateSession(input.id, input.rating, input.comment);
  res.sendStatus(saved ? 200 : 404);
});

module.exports = router;
