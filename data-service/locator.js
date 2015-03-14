var config = require('./config.json');

// pick the data driver string from the environment
// or fallback to the value in config.json
var dataDriver = process.env.CONF_RAT_DATA_DRIVER || config.dataDriver;

module.exports = {
    getDataService: function() {
        return require(dataDriver);
    }
}