var _ = require('lodash');
var fs = require('fs');

module.exports = {
    sessionsList: null,

    getSessionsList: function () {
        if(!this.sessionsList) {
            this.sessionsList = require('./talks.json');
        }

        return this.sessionsList;
    },

    getSessionById: function(id) {
        id = parseInt(id);
        return _.find(this.getSessionsList(), function(s) {
            return s.id === id;
        });
    },

    rateSession: function (id, rating, comment) {
        var session = this.getSessionById(id);
        if(session) {
            if(!session["ratings"]) {
                session.ratings = [];
            }
            session.ratings.push(rating);

            if(!session["comments"]) {
                session.comments = [];
            }

            if(comment) {
                session.comments.push(comment);
            }

            // save to 'talks.json'
            fs.writeFileSync('./drivers/json-file/talks.json', JSON.stringify(this.getSessionsList()));
            return true;
        }

        return false;
    }
};
