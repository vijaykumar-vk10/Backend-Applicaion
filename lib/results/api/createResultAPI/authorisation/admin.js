/**
 * @name Admin
 * @description Admin Create Result flow
 * @author vijaykumar
 * @version 1.0
 */

/* Imports */
var Canister = require('../../../../../utils/canister/canister')
var createResult = require('../../../bin/createResult')

/* Create Result */
var adminCreateResult = async function (Request, Response, connection) {
    try {

        // Get Result Data
        var resultData = Request.body.payLoad
        
        var createResultOutput = await createResult(resultData, connection)

        // Error Handle for DB Error
        if (createResultOutput.error != null) {
            throw {"code": "FST105F", "message": "Teacher Fetch - DB Error", "statusCode": 500}
        }

        // Build Response
        let payLoad = createResultOutput.response;

        var responseCanister = new Canister("Results","createResults")
        responseCanister.addPayload(payLoad)
        responseCanister.addStatus("success", "CP000S")
        Response.statusCode = 200

        //Return Response
        Response.json(responseCanister.JSON())
        return null

    } catch (error) {

        if(error.code == null){
            error = {
                "code":"FST102F",
                "message": "Result Creation Failed",
                "statusCode": 500
            }
        }
        // Build Response
        let responseCanister = new Canister("Reports","createResults")
        responseCanister.addStatus("failure", null)
        responseCanister.addError(error.code, error.message)
        Response.statusCode = error.statusCode

        //Send  Response
        Response.json(responseCanister.JSON())
        return null
    }
}

module.exports = adminCreateResult