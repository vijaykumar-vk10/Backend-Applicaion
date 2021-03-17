/**
 * @name createResult
 * @author VijayKumar
 * @version 1.0
 * @type Primitive
 */

/* Imports */
var {resultDBSchema, getResultDBModel} = require("../utils/db/DB_Schemas/resultDBSchema");

/* Primitive Create Parent */
var createResult = async function (data, connection) {
    try {

        //Get Parent Data
        var resultData = data

        //Get Connection Model using the Connection
        var resultModel = getResultDBModel(connection);

        //Save parent data in DB
        var result = new resultModel(resultData);
        var resultResponse = await result.save()

        //Result Object
        var returnObject = {
            response: resultResponse,
            error: null
        }

        return returnObject

    } catch (error) {
        console.log(e);
        var returnObject = {
            response: null,
            error: error
        }
        return returnObject
    }
}

module.exports = createResult