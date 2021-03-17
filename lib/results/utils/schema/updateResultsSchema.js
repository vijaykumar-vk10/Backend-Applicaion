/* Imports */
var Joi = require('@hapi/joi')
var Canister =  require('../../../../utils/canister/canister')

const updateResultSchema = Joi.object({
    metadata: Joi.object().keys({
        timeStamp: Joi.date().iso().required(),
        service: Joi.string().required(),
        subService: Joi.string().required()
    }).required(),
    payLoad: Joi.object().keys({
        _id: Joi.string().required(),
        schoolID: Joi.string().required(),
        section: Joi.string().required(),
        classID: Joi.string().required(),
        assismentID: Joi.string().required(),
        postedDate: Joi.date().iso().required(),
        teacherID: Joi.string().required(),
        studentID: Joi.string().required(),
        result : Joi.array().items( Joi.object().keys({
            _id: Joi.string().required(),
            subjectID : Joi.string().required(),
            marks : Joi.number().required(),
            fullMark : Joi.number().required(),
            review : Joi.string().required(),
            passPercentage : Joi.number().required(),
        })
        )
    }).required(),
    payLoadType: Joi
        .when(
            Joi.ref('payLoad'),
                {is: Joi.array(), then: Joi.string().valid('array')}
        )
        .when(
            Joi.ref('payLoad'),
                {not: Joi.array(), then: Joi.string().valid('object')}
        ).required(),
    status: Joi.string(),
    statusCode: Joi.string(),
    error: Joi.string(),
    errorDetail: Joi.object().keys({
        code: Joi.string(),
        description: Joi.string()
    })
})


const updateResults = async function(Request, Response, next){
    try {
        const error = await updateResultSchema.validateAsync(Request.body);
        next();
    } catch (error) {
        Response.statusCode=500
        var responseCanister = new Canister('registration','createManagement')
        responseCanister.addStatus("failure",null)
        responseCanister.addError("CM000F","Generic Validation Error :"+error.details[0].message)
        return Response.json(responseCanister)
    }
    
}

module.exports = updateResults