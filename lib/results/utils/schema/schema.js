/* Import base Validation */

var createResults = require('./createResultsSchema')
var fetchResults = require('./fetchResultsSchema')
var updateResults = require('./updateResultsSchema');
var deleteResults = require('.//deleteResultsSchema');


module.exports = {
    createResults,
    fetchResults,
    updateResults,
    deleteResults
}