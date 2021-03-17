/**
 * @name deleteResultAPI
 * @param {CanisterObject} Request 
 * @param {CanisterObject} Response 
 * @param {DBConnectionObject} connection 
 * @description Delete Result API
 * @author Vijaykumar
 * @version 1.0
 */

/* Imports */
var Canister = require('../../../../utils/canister/canister')
var jwt = require('jsonwebtoken')
var logger = require("../../../../utils/logger/logger")

/* Modules Import */
var adminDeleteResults = require('./authorisation/admin')
var teacherDeleteResults = require('./authorisation/teacher')
var managementDeleteResults = require('./authorisation/management')

/* Delete Result API */
var deleteResultAPI = async function (Request, Response, connection) {
    try {

        console.log("Invoked - Delete Results API")
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
                var adminUpdateResultsObject = adminDeleteResults(Request, Response, connection)
                break;

            case "management":
                console.log("Started - Management Update Result API")
                var smanagementUpdateResultsObject = managementDeleteResults(Request, Response, connection)
                break;
 
            case "teacher":
                console.log("Started - Teacher Update Result API")
                var teacherUpdateResultsObject = teacherDeleteResults(Request, Response, connection, ACCESS_TOKEN_DECODED)
                break;

            default:
                console.log("WARN: Access Restricted")
                throw "Access Restricted"
                break;
        }

    } catch (error) {

        //Log Error

        // Build Response
        var responseCanister = new Canister()
        responseCanister.addStatus("failure", null)
        responseCanister.addError("DSU101F", "Access Validation Error")
        Response.statusCode = 403

        //Return Response
        Response.json(responseCanister.JSON())
        return null
    }
}

module.exports = deleteResultAPI