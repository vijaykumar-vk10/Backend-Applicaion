/**
 * @name FetchResultAPI
 * @param {CanisterObject} Request 
 * @param {CanisterObject} Response 
 * @param {DBConnectionObject} connection 
 * @description Fetch Result API
 * @author vijaykumar
 * @version 1.0
 */

/* Imports */
var Canister = require('../../../../utils/canister/canister')
var jwt = require('jsonwebtoken')
var logger = require("../../../../utils/logger/logger")

/* Modules Import */
var adminFetchResult = require('../fetchResultAPI/authorisation/admin')
var managementFetchResult = require('../fetchResultAPI/authorisation/management')
var parentFetchResult = require('./authorisation/parent')
var schoolFetchResult = require('./authorisation/school')
var teacherFetchResult = require('../fetchResultAPI/authorisation/teacher')

/* Create Result API */
var fetchResultAPI = async function (Request, Response, connection) {
    try {

        //logger.logInfo("Invoked - Create Result API")
        /**
         * Authentication Tokens Decode
         */
        var ACCESS_TOKEN =  Request.get("ACCESS_TOKEN")
        var ACCESS_TOKEN_DECODED = jwt.verify(ACCESS_TOKEN, process.env.ACCESS_TOKEN_SECRETE)

        /**
         * Handle Authorisation Flows
         */

        switch (ACCESS_TOKEN_DECODED.primaryRole) {
            case "admin":
                logger.logInfo("Started - Admin Fetch Parent API")
                var adminFetchSubjectResulObject = adminFetchResult(Request, Response, connection)
                break;

            case "management":
                console.log("Started - management Fetch Parent API")
                var managementFetchSubjectResultObject =  managementFetchResult(Request, Response, connection, ACCESS_TOKEN, ACCESS_TOKEN_DECODED);
                break;

            case "parent":
                console.log("Started - Parent Fetch Subject API")
                var parentFetchSubjectResultObject = parentFetchResult(Request, Response, connection, ACCESS_TOKEN, ACCESS_TOKEN_DECODED)
                break;
    
            case "school":
                console.log("Started - School Fetch Subject API")
                var schoolFetchSubjectResultObject = schoolFetchResult(Request, Response, connection, ACCESS_TOKEN, ACCESS_TOKEN_DECODED)
                break;
            case "teacher":
                console.log("Started - Teacher Fetch Parent API")
                var teacherFetchParentResultObject = teacherFetchResult(Request, Response, connection, ACCESS_TOKEN, ACCESS_TOKEN_DECODED)
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
        responseCanister.addStatus("failure", null)
        responseCanister.addError("CST101F", "Access Validation Error")
        Response.statusCode = 403

        //Return Response
        Response.json(responseCanister.JSON())
        return null
    }
}

module.exports = fetchResultAPI