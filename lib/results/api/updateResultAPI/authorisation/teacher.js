/**
 * @name teacher
 * @description teacher Update Result flow
 * @author Vijaykumar
 * @version 1.0
 */

/* Imports */
var Canister = require('../../../../../utils/canister/canister')
var updateResult = require('../../../bin/updateResult')
var restApi = require('../../../../../utils/api/restApi')

/* Create Reuslt */
var teacherUpdateResults = async function (Request, Response, connection, ACCESS_TOKEN, ACCESS_TOKEN_DECODED) {
    try {
        
        //Get Reuslt Data
        var ResultData = {
            query : {"_id" : Request.body.payLoad._id }, 
            data : Request.body.payLoad
        }
        /* Fetch Teacher */
        var teacherData = ACCESS_TOKEN_DECODED.id       
        var fetchteacherOuput = await restApi(`${process.env.Mangament_URL}?_id=${teacherData}`,ACCESS_TOKEN)
        //Error Handle for DB Error
        if (fetchteacherOuput.error != null || fetchteacherOuput.response.payLoad.length == 0) {
            throw {"code": "FST105F", "message": "Managment Fetch - DB Error", "statusCode": 500}
        }
        console.log(Request.body.payLoad.schoolID)
        if(fetchteacherOuput.response.payLoad[0].schoolID != Request.body.payLoad.schoolID){
            throw {"code": "FST105F", "message": "School ID does not match", "statusCode": 500}
        }

        /** Update data in DB */
        var updateResultOutput = await updateResult(ResultData, connection)

        //Error Handle for DB Error
        if (updateResultOutput.error != null) {
            throw {"code": "FST105F", "message": "Reports Update - DB Error", "statusCode": 500}
        }

        // Build Response
        var responseCanister = new Canister("Reports","createResults")
        var buildCanister = await responseCanister.fromJSON(Request.body)
        responseCanister.addStatus("success", "UM000S")
        Response.statusCode = 200

        /** Send Response*/
        Response.json(responseCanister.JSON())
        return null

    } catch (error) {
        if(error.code == null){
            error = {
                "code":"FST102F",
                "message": "Result Updation Failed",
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

module.exports = teacherUpdateResults