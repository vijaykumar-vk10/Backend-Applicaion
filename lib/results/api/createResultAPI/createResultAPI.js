/**
 * @name CreateResultAPI
 * @param {CanisterObject} Request 
 * @param {CanisterObject} Response 
 * @param {DBConnectionObject} connection 
 * @description Create Result API
 * @author vijaykumar
 * @version 1.0
 */

/* Imports */
var Canister = require('../../../../utils/canister/canister')
var jwt = require('jsonwebtoken')
var logger = require("../../../../utils/logger/logger")

/* Modules Import */
var adminCreateResult = require('../createResultAPI/authorisation/admin')
var managementCreateResult = require('../createResultAPI/authorisation/management')
var teacherCreateResult = require('../createResultAPI/authorisation/teacher')

/* Create Result API */
var createResultAPI = async function (Request, Response, connection) {
    try {

        //logger.logInfo("Invoked - Create Result API")
        /**
         * Authentication Tokens Decode
         */
        var ACCESS_TOKEN =  Request.get("ACCESS_TOKEN")
        //console.log(ACCESS_TOKEN);
        var ACCESS_TOKEN_DECODED = jwt.verify(ACCESS_TOKEN, process.env.ACCESS_TOKEN_SECRETE)
        /**
         * Handle Authorisation Flows
         */

        switch (ACCESS_TOKEN_DECODED.primaryRole) {
            case "admin":
                logger.logInfo("Started - Admin Fetch Parent API")
                var adminCreateResultObject = adminCreateResult(Request, Response, connection)
                break;

            case "management":
                console.log("Started - management Fetch Parent API")
                var managementCreateResultObject =  managementCreateResult(Request, Response, connection, ACCESS_TOKEN,ACCESS_TOKEN_DECODED);
                break;

            case "teacher":
                console.log("Started - Teacher Fetch Parent API")
                var teacherFetchParentResultObject = teacherCreateResult(Request, Response, connection, ACCESS_TOKEN_DECODED)
                break;

            default:
                logger.logInfo("WARN: Access Restricted")
                throw "Access Restricted"
                break;
        }
        

    } catch (error) {

        //Log Error
        // Build Response
        console.log(error)
        var responseCanister = new Canister("Results","createResults")
        var buildCanister = await responseCanister.fromJSON(Request.body)
        responseCanister.addStatus("failure", null)
        responseCanister.addError("CST101F", "Access Validation Error")
        Response.statusCode = 403

        //Return Response
        Response.json(responseCanister.JSON())
        return null
    }
}

module.exports = createResultAPI