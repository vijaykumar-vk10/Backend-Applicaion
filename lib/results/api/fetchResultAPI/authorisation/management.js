/**
 * @name Management
 * @description Management Fetch Result flow
 * @author Vijaykumar
 * @version 1.0
 */

/* Imports */
var Canister = require('../../../../../utils/canister/canister')
var fetchResult = require('../../../bin/fetchResult')
var restApi = require('../../../../../utils/api/restApi')

/* Fetch Result */
var managementFetchResult = async function (Request, Response, connection, ACCESS_TOKEN, ACCESS_TOKEN_DECODED) {
    try {
        
        /** Get Result Data */
        var ResultQuery = Request.query
        /* Fetch Managemnet */
        var managementData = ACCESS_TOKEN_DECODED.id       
        var fetchManagementOuput = await restApi(`${process.env.Mangament_URL}?_id=${managementData}`,ACCESS_TOKEN)
        //Error Handle for DB Error
        if (fetchManagementOuput.error != null || fetchManagementOuput.response.payLoad.length == 0 ) {
            throw {"code": "FST105F", "message": "Managment Fetch - DB Error", "statusCode": 500}
        }

        ResultQuery["schoolID"] = fetchManagementOuput.response.payLoad[0].schoolID
        /** Fetch Result from DB */
        var fetchResultOutput = await fetchResult(ResultQuery, connection)
        //Error Handle for DB Error
        if (fetchResultOutput.error != null) {
            throw {"code": "FST105F", "message": "Reports Fetch - DB Error", "statusCode": 500}
        }

        /* Build Response */
        var responseCanister = new Canister("Reports","FetchResults")
        responseCanister.addPayload(fetchResultOutput.response)
        responseCanister.addStatus("success", "FSU000S")
        Response.statusCode = 200

        //Send Response
        Response.json(responseCanister.JSON())
        return null

    } catch (error) {

        if(error.code == null){
            error = {
                "code":"FST102F",
                "message": "Result Fetch Failed",
                "statusCode": 500
            }
        }
        /* Build Response */
        var responseCanister = new Canister("Reports","fetchResults")
        responseCanister.addStatus("failure", null)
        responseCanister.addError(error.code, error.message)
        Response.statusCode = error.statusCode

        /** Send Response*/
        Response.json(responseCanister.JSON())
        return null
    }
}

module.exports = managementFetchResult