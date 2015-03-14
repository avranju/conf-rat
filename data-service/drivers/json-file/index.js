var _ = require('lodash');
var fs = require('fs');

module.exports = {
    sessionsList: null,

    init: function(cb) {
        cb(null);
    },

    getSessionsList: function (cb) {
        if(!this.sessionsList) {
            this.sessionsList = require('./talks.json');
        }

        cb(null, this.sessionsList);
    },

    getSessionById: function(id, cb) {
        id = parseInt(id);

        var self = this;
        self.getSessionsList(function(err, sessions) {
            if(err) {
                return cb(err);
            }

            var session = _.find(sessions, function(s) {
                return s.id === id;
            });

            cb(session ? null : "Session not found.", session);
        });
    },

    rateSession: function (id, rating, comment, cb) {
        var self = this;
        self.getSessionById(id, function(err, session) {
            if(err) {
                return cb(err);
            }

            if (!session["ratings"]) {
                session.ratings = [];
            }
            session.ratings.push(rating);

            if (!session["comments"]) {
                session.comments = [];
            }

            if (comment) {
                session.comments.push(comment);
            }

            // save to 'talks.json'
            fs.writeFile('./drivers/json-file/talks.json', JSON.stringify(this.getSessionsList()), cb);
        });
    }
};
