var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('../config.json');

var dataServiceURL = findDataServiceURL();
console.log('Using data service URL: ', dataServiceURL);

function findDataServiceURL() {
  // pick the data service URL from the environment
  // or fallback to the value in config.json;

  // if CONF_RAT_DATA_SERVICE_URL exists then we use that
  if(process.env.CONF_RAT_DATA_SERVICE_URL) {
    return process.env.CONF_RAT_DATA_SERVICE_URL;
  }

  // if environment variable called CR_DATA_SERVICE_HOST and
  // CR_DATA_SERVICE_PORT exist then we use that to build the
  // url
  if(process.env.CR_DATA_SERVICE_HOST && process.env.CR_DATA_SERVICE_PORT) {
    return "http://" + process.env.CR_DATA_SERVICE_HOST + ":" + process.env.CR_DATA_SERVICE_PORT;
  }
  
  // if environment variable called CR_DATA_SERVICE_SERVICE_HOST and
  // CR_DATA_SERVICE_SERVICE_PORT exist then we use that to build the
  // url; this happens when run in Kubernetes
  if(process.env.CR_DATA_SERVICE_SERVICE_HOST && process.env.CR_DATA_SERVICE_SERVICE_PORT) {
    return "http://" + process.env.CR_DATA_SERVICE_SERVICE_HOST + ":" + process.env.CR_DATA_SERVICE_SERVICE_PORT;
  }

  // if nothing else is available fallback on the config file value;
  // this will only work during local dev
  return config.dataServiceURL;
}

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
