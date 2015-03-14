var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');
var config = require('./config');
var Session = require('./models/session');

// init doc db client
var docDBClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

// initialize session object
var session = new Session(docDBClient, config.databaseId, config.collectionId);

module.exports = {
    init: function(cb) {
        session.init(cb);
    },

    getSessionManager: function () {
        return session;
    },

    getSessionsList: function(cb) {
        session.find({
            query: 'SELECT * FROM root'
        }, cb);
    },

    getSessionById: function(id, cb) {
        session.getItem(id, cb);
    },

    rateSession: function(id, rating, comment, cb) {
        session.updateRating(id, rating, comment, cb);
    }
};