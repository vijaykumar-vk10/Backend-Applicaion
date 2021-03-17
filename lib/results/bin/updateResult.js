/**
 * @name updateResults
 * @author vijaykumar
 * @version 1.0
 */

/* Imports */
var { ResultDBSchema, getResultDBModel } = require("../utils/db/DB_Schemas/resultDBSchema");

/* Create Student */
var updateResult = async function (data, connection) {
    try {
        //Get Student Data
        var ResultData = data
        
        //Get Connection Model using the Connection
        var resultModel = getResultDBModel(connection);
        //Update
        var resultSet =  await resultModel.replaceOne(ResultData.query,ResultData.data);
        //Result Object
        if(resultSet.nModified != 0){
        var returnObject = {
            response: resultSet,
            error: null
        }
        return returnObject
        }
        throw('modification failed')

    } catch (error) {
        console.log(error);
        //Result Object
        var returnObject = {
            response: null,
            error: error
        }
        return returnObject
    }
}

module.exports = updateResult