/* Imports */
var Joi = require('@hapi/joi')
var Canister =  require('../../../../utils/canister/canister')

const deleteResultSchema = Joi.object({
        schoolID: Joi.string(),
        _id: Joi.string(),
        //section: Joi.string(),
        classID: Joi.string(),
        assismentID: Joi.string(),
        teacherID: Joi.string(),
        studentID: Joi.string()
    })


const deleteResult = async function(Request, Response, next){
    try {
        const error = await deleteResultSchema.validateAsync(Request.query);
        next();
    } catch (error) {
        Response.statusCode=500
        var responseCanister = new Canister('Reports','FetchResults')
        responseCanister.addStatus("failure",null)
        responseCanister.addError("CM000F","Generic Validation Error :"+error.details[0].message)
        return Response.json(responseCanister)
    }
    
}

module.exports = deleteResult