/**
 * @name updateResultsAPI
 * @param {CanisterObject} Request 
 * @param {CanisterObject} Response 
 * @param {DBConnectionObject} connection 
 * @description Update Management API
 * @author VijayKumar
 * @version 1.0
 */

/* Imports */
var Canister = require('../../../../utils/canister/canister')
var jwt = require('jsonwebtoken')
var logger = require("../../../../utils/logger/logger")

/* Modules Import */
var teacherUpdateResults = require('./authorisation/teacher')
var adminUpdateResults = require('./authorisation/admin')
var managementUpdateResults = require('./authorisation/management')

/* Update Management API */
var updateManagementAPI = async function (Request, Response, connection) {
    try {

        logger.logInfo("Invoked - Update Management API")
        /**
         * Authentication Tokens Decode
         */
        var ACCESS_TOKEN = Request.get("ACCESS_TOKEN")
        var ACCESS_TOKEN_DECODED = jwt.verify(ACCESS_TOKEN, process.env.ACCESS_TOKEN_SECRETE)

        /**
         * Handle Authorisation Flows
         */

        switch (ACCESS_TOKEN_DECODED.primaryRole) {
            case "admin":
                console.log("Started - Admin Update Result API")
                var adminUpdateResultsObject = adminUpdateResults(Request, Response, connection)
                break;

            case "management":
                console.log("Started - Management Update Result API")
                var smanagementUpdateResultsObject = managementUpdateResults(Request, Response, connection,ACCESS_TOKEN, ACCESS_TOKEN_DECODED)
                break;
 
            case "teacher":
                console.log("Started - Teacher Update Result API")
                var teacherUpdateResultsObject = teacherUpdateResults(Request, Response, connection, ACCESS_TOKEN, ACCESS_TOKEN_DECODED)
                break;

            default:
                console.log("WARN: Access Restricted")
                throw "Access Restricted"
                break;
        }

    } catch (error) {

        //Log Error
        logger.logError("Error: UM101F Logged")
        logger.logError(error.toString())

        // Build Response
        var responseCanister = new Canister()
        var buildCanister = await responseCanister.fromJSON(Request.body)
        responseCanister.addStatus("failure", null)
        responseCanister.addError("UM101F", "Access Validation Error")
        Response.statusCode = 403

        //Return Response
        Response.json(responseCanister.JSON())
        return null
    }
}

module.exports = updateManagementAPI