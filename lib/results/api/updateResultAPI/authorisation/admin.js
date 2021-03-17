/**
 * @name Admin
 * @description Admin Update Result flow
 * @author Vijaykumar
 * @version 1.0
 */

/* Imports */
var Canister = require('../../../../../utils/canister/canister')
var updateResult = require('../../../bin/updateResult')

/* Create admin */
var adminUpdateResults = async function (Request, Response, connection) {
    try {
        
        //Get Reuslt Data
        var ResultData = {
            query : {"_id" : Request.body.payLoad._id }, 
            data : Request.body.payLoad
        }
        /**
         * Process Data
         * Process Data requires 
         *  1. Result of the Student in the Request Locals
         *  2. Result Data in Payload
         **/


        /**
         * Primitive Operation Call
         * Perform primitive operation for the data in the DBS
        **/
        var updateResultOutput = await updateResult(ResultData, connection)

        //Error Handle for DB Error
        if (updateResultOutput.error != null) {
            var responseCanister = new Canister()
            var buildCanister = await responseCanister.fromJSON(Request.body)
            responseCanister.addStatus("failure", null)
            responseCanister.addError("UM103F", "Result Update  - DB Error")
            Response.statusCode = 500
            Response.json(responseCanister.JSON())
            return null
        }

        // Build Response
        var responseCanister = new Canister()
        var buildCanister = await responseCanister.fromJSON(Request.body)
        responseCanister.addStatus("success", "UM000S")
        Response.statusCode = 200

        //Send Response
        Response.json(responseCanister.JSON())
        return null

    } catch (error) {
        // Build Response
        var responseCanister = new Canister()
        var buildCanister = await responseCanister.fromJSON(Request.body)
        responseCanister.addStatus("failure", null)
        responseCanister.addError("UM102F", "Result Update failed")
        Response.statusCode = 500

        //Send Response
        Response.json(responseCanister.JSON())
        return null
    }
}

module.exports = adminUpdateResults