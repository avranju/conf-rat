var _ = require('lodash');
var fs = require('fs');

module.exports = {
    getSessionsList: function () {
        return require('./talks.json');
    },

    getSessionById: function(id) {
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
            session.comments.push(comment);

            // save to 'talks.json'
            fs.writeFileSync('./drivers/json-file/talks.json', JSON.stringify(sessions));
            return true;
        }

        return false;
    }
};
