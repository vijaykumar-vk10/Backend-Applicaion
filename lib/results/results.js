/* Imports */
var express = require('express')
var Canister = require('../../utils/canister/canister')
var {Mongo} = require('../../utils/db/db')

/* Validation Imports */
var schemaValidation = require("./utils/schema/schema")

/* Services Import */
var createResults = require("./api/createResultAPI/createResultAPI");
var fetchResults = require("./api/fetchResultAPI/fetchResultAPI");
var updateResults = require("./api/updateResultAPI/updateResultAPI");
var deleteResults = require("./api/deleteResultAPI/deleteResultAPI");

/* Init */
var resultsRouter = express.Router()

/* Database Connection */
var MongoDB = new Mongo()
var db = MongoDB.getConnection()

/* MiddleWare */
resultsRouter.use(express.json())

resultsRouter.post('/', schemaValidation.createResults, async (Request, Response) => {
    
    try {
        var connection = await db;
        createResults(Request, Response, connection)
        return null
    } catch (error) {
        console.log(error);
        return null
    }

});

resultsRouter.get('/' , schemaValidation.fetchResults , async (Request, Response) => {
    try {
        var connection = await db;
        fetchResults(Request, Response, connection)
        return null
    } catch (error) {
        var responseCanister = new Canister('Reports','fetchresults')
        responseCanister.fromJSON(Request.body)
        responseCanister.addStatus("failure","FT100F")
        responseCanister.addError("FT100F","Generic Error"+error)
        Response.statusCode=500
        Response.json(responseCanister.JSON())
        return null
    }
})


resultsRouter.put('/' , schemaValidation.updateResults, async (Request, Response) => {
    
    try {
        var connection = await db;
        updateResults(Request, Response, connection)
        return null
    } catch (error) {
        var responseCanister = new Canister('registration','updateManagement')
        responseCanister.fromJSON(Request.body)
        responseCanister.addStatus("failure","UM100F")
        responseCanister.addError("UM100F","Generic Error"+error)
        Response.statusCode=500
        Response.json(responseCanister.JSON())
        return null
    }
})

resultsRouter.delete('/', schemaValidation.deleteResults ,async (Request, Response) => {
    try {
        var connection = await db;
        deleteResults(Request, Response, connection)
        return null
    } catch (error) {
        var responseCanister = new Canister('Reports','deleteResults')
        responseCanister.fromJSON(Request.body)
        responseCanister.addStatus("failure","DT100F")
        responseCanister.addError("DT100F","Generic Error"+error)
        Response.statusCode=500
        Response.json(responseCanister.JSON())
        return null
    }
})


module.exports = resultsRouter
