/**
 * @name Admin
 * @description Admin Fetch Result flow
 * @author Vijaykumar
 * @version 1.0
 */

/* Imports */
var Canister = require('../../../../../utils/canister/canister')
var fetchResult = require('../../../bin/fetchResult')

/* Fetch Parent */
var adminFetchResult = async function (Request, Response, connection) {
    try {
        
        //Get Parent Data
        var ResultQuery = Request.query

        var fetchResultOutput = await fetchResult(ResultQuery, connection)
       // console.log(fetchResultOutput);
        //Error Handle for DB Error
        if (fetchResultOutput.error != null) {
            var responseCanister = new Canister("Reports","FetchResults")
            responseCanister.addStatus("failure", null)
            responseCanister.addError("FSU103F", "Result Fetch - DB Error")
            Response.statusCode = 500
            Response.json(responseCanister.JSON())
            return null
        }

        // Build Response
        var responseCanister = new Canister("Reports","FetchResults")
        responseCanister.addPayload(fetchResultOutput.response)
        responseCanister.addStatus("success", "FSU000S")
        Response.statusCode = 200

        //Send Response
        Response.json(responseCanister.JSON())
        return null

    } catch (error) {
        console.log(error);
        // Build Response
        var responseCanister = new Canister("Reports","fetchResults")
        responseCanister.addStatus("failure", null)
        responseCanister.addError("FSU102F", "Result Fetch failed")
        Response.statusCode = 500

        //Send Response
        Response.json(responseCanister.JSON())
        return null
    }
}

module.exports = adminFetchResult