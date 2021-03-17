/**
 * @name teacher
 * @description Mangement Create Result flow
 * @author vijaykumar
 * @version 1.0
 */

/* Imports */
var Canister = require('../../../../../utils/canister/canister')
var createResult = require('../../../bin/createResult')
var restApi = require('../../../../../utils/api/restApi')

/* Create Result */
var teacherCreateResult = async function (Request, Response, connection,ACCESS_TOKEN,ACCESS_TOKEN_DECODED) {
    try {

        // Get Result Data
        var resultData = Request.body.payLoad

        /* Fetch Teacher */
        var teacherData = ACCESS_TOKEN_DECODED.id       
        var fetchteacherOuput = await restApi(`${process.env.Teacher_URL}?_id=${teacherData}`,ACCESS_TOKEN)
        //Error Handle for DB Error
        if (fetchteacherOuput.error != null || fetchteacherOuput.response.payLoad.length == 0) {
            throw {"code": "FST105F", "message": "Teacher Fetch - DB Error", "statusCode": 500}
        }
        if(fetchteacherOuput.response.payLoad[0].schoolID != resultData.schoolID){
            throw {"code": "FST105F", "message": "Teacher School ID does not match", "statusCode": 500}
        }

        /** Add data in DB */
        var createResultOutput = await createResult(resultData, connection)
        // Error Handle for DB Error
        if (createResultOutput.error != null) {
            throw {"code": "FST105F", "message": "Reports Create - DB Error", "statusCode": 500}
        }
        /* Build Response */
        let payLoad = createResultOutput.response;
        var responseCanister = new Canister("Results","createResults")
        responseCanister.addPayload(payLoad)
        responseCanister.addStatus("success", "CP000S")
        Response.statusCode = 200

        /** Send Response*/
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
        /* Build Response */
        var responseCanister = new Canister("Reports","createResults")
        var buildCanister = await responseCanister.fromJSON(Request.body)
        responseCanister.addStatus("failure", null)
        responseCanister.addError(error.code, error.message)
        Response.statusCode = error.statusCode

        /** Send Response*/
        Response.json(responseCanister.JSON())
        return null
    }
}

module.exports = teacherCreateResult