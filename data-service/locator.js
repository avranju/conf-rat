module.exports = {
    getDataService: function() {
        var config = require('./config.json');
        return require(config.dataDriver);
    }
}