var DocumentDBClient = require('documentdb').DocumentClient;
var docdbUtils = require('./docdb-utils');

function Session(documentDBClient, databaseId, collectionId) {
    this.client = documentDBClient;
    this.databaseId = databaseId;
    this.collectionId = collectionId;

    this.database = null;
    this.collection = null;
}

Session.prototype = {
    init: function (callback) {
        var self = this;

        docdbUtils.getOrCreateDatabase(self.client, self.databaseId, function (err, db) {
            if (err) {
                return callback(err);
            }

            self.database = db;
            docdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId, function (err, coll) {
                if (!err) {
                    self.collection = coll;
                }

                callback(err);
            });
        });
    },

    find: function(querySpec, callback) {
        var self = this;
        self.client.queryDocuments(self.collection._self, querySpec).toArray(callback);
    },

    add: function(item, callback) {
        var self = this;
        self.client.createDocument(self.collection._self, item, callback);
    },

    updateRating: function(itemId, rating, comment, callback) {
        var self = this;

        self.getItem(itemId, function(err, doc) {
            if (err) {
                return callback(err);
            } else {
                // copy the document body to a new object
                var newDoc = {
                    id: doc.id,
                    time: doc.time,
                    title: doc.title,
                    abstract: doc.abstract,
                    speakers: doc.speakers,
                    ratings: doc.ratings || [],
                    comments: doc.comments || []
                };

                if(rating) {
                    newDoc.ratings.push(rating);
                }

                if(comment) {
                    newDoc.comments.push(comment);
                }

                self.client.replaceDocument(doc._self, newDoc, callback);
            }
        });
    },

    getItem: function(itemId, callback) {
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [{
                name: '@id',
                value: itemId
            }]
        };

        self.client.queryDocuments(self.collection._self, querySpec).toArray(function(err, results) {
            if (err || !results || results.length === 0) {
                callback(err);
            } else {
                callback(null, results[0]);
            }
        });
    }
};

module.exports = Session;