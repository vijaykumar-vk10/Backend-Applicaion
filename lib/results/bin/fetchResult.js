/**
 * @name FetchResult
 * @description Fetch student Result details
 * @version 1.0
 * @author vijaykumar
**/

/* Import */
var { resultDBSchema, getResultDBModel } = require("../utils/db/DB_Schemas/resultDBSchema");

/* Service */
var fetchResult = async function (query, connection) {

    try {
        var resultModel = getResultDBModel(connection);
        var resultSet = await resultModel.find(query);
        if (resultSet.length != 0){
        //Result Object
        var returnObject = {
            response: resultSet,
            error: null
        }
        return returnObject
        }
        throw('empty Object')

    } catch (error) {
        console.log(error)
        var returnObject = {
            response: null,
            error: error
        }
        return returnObject
    }
}

module.exports = fetchResult