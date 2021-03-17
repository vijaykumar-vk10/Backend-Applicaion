/**
 * @name Teacher
 * @description Admin Delete Result flow
 * @author vijaykumar
 * @version 1.0
 */

/* Imports */
var Canister = require('../../../../../utils/canister/canister')
var deleteResult = require('../../../bin/deleteResult')

/* Delete Result */
var teacherDeleteResults = async function (Request, Response, connection) {
    try {
        
        //Get Parent Data
        var resultQuery = Request.query

        /**
         * Process Data
         * Process Data requires 
         *  1. Details of the Teacher User in the Request Locals
         *  2. Parent Data in Payload
         **/


        /**
         * Primitive Operation Call
         * Perform primitive operation for the data in the DBS
        **/
        var deleteSubjectOutput = await deleteResult(resultQuery, connection)

        //Error Handle for DB Error
        if (deleteSubjectOutput.error != null) {
            var responseCanister = new Canister()
            responseCanister.addStatus("failure", null)
            responseCanister.addError("DSU103F", "result Deletion - DB Error")
            Response.statusCode = 500
            Response.json(responseCanister.JSON())
            return null
        }

        // Build Response
        var responseCanister = new Canister()
        responseCanister.addStatus("success", "DSU000S")
        Response.statusCode = 200

        //Send Response
        Response.json(responseCanister.JSON())
        return null

    } catch (error) {
        // Build Response
        var responseCanister = new Canister()
        var buildCanister = await responseCanister.fromJSON(Request.body)
        responseCanister.addStatus("failure", null)
        responseCanister.addError("DSU102F", "result Deletion failed")
        Response.statusCode = 500

        //Send Response
        Response.json(responseCanister.JSON())
        return null
    }
}

module.exports = teacherDeleteResults