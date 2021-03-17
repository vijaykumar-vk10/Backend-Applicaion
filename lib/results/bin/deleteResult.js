/**
 * @name DeleteResult
 * @description Delete Result details
 * @version 1.0
 * @author Vijaykumar
**/

/* Import */
var { ResultDBSchema, getResultDBModel } = require("../utils/db/DB_Schemas/resultDBSchema");

/* Service */
var deleteresult = async function (data, connection) {

    try {
        //Create New Student Model
        var ResultModel = getResultDBModel(connection);

        //DB Delete
        var resultSet = await ResultModel.deleteMany(data);

        if(resultSet.n != 0){
        //Result Object
        var returnObject = {
            response: resultSet,
            error: null
        }
        return returnObject
        }

        throw('Unable to delete')
    } catch (error) {
        //Result Object
        var returnObject = {
            response: null,
            error: error
        }
        return returnObject
    }

}

module.exports = deleteresult