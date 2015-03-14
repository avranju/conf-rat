var async = require('async'),
    dataService = require('./index'),
    sessions = require('../json-file/talks-reset.json');

function main() {
    dataService.init(loadData);
}

function loadData(err) {
    if(err) {
        return console.log("Data service init failed. ", err);
    }

    // load all sessions into the db
    async.each(sessions, function (session, cb) {
        async.waterfall([
            function (cb1) {
                // check if this session already exists in the db
                console.log("Checking if session '%s' exists.", session.title);
                dataService.getSessionById(session.id, function(err, result) {
                    cb1(err, result);
                });
            },
            function (result, cb1) {
                // if session exists then we do nothing else
                if (result) {
                    console.log("'%s' exists.", session.title);
                    return cb1(null);
                }

                // create a new session in the db
                console.log("'%s' doesn't exist. Creating.", session.title);
                var sessionManager = dataService.getSessionManager();
                sessionManager.add(session, cb1);
            }
        ], function (err) {
            if (err) {
                console.log("'%s' get/create failed", session.title);
            } else {
                console.log("'%s' session ok", session.title);
            }
            cb(err);
        });
    }, function (err) {
        console.log("All over. Err: " + err);
    });
}

main();