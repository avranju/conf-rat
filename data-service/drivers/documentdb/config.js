var config = {
    host: process.env.DOCUMENTDB_HOST || 'https://nerdworks.documents.azure.com:443/',
    authKey: process.env.DOCUMENTDB_AUTH_KEY || 'Hls0MEmKKHqIuFt72gJYMVlj1MTkAZvzBSem5m+nMvR837tkEAiIcYgWGwxdKK0eycHQK1Uv8VDJCIoYd3Y1SQ==',
    databaseId: 'confrat',
    collectionId: 'sessions'
};

module.exports = config;
