/* Imports */
var Joi = require('@hapi/joi')

const canisterSchema = Joi.object({
    metadata: Joi.object().keys({
        timeStamp: Joi.date().iso().allow(null),
        service: Joi.string().required(),
        subService: Joi.string().required()
    }).required(),
    payLoad: Joi.required(),
    payLoadType: Joi
        .when(
            Joi.ref('payLoad'),
                {is: Joi.array(), then: Joi.string().valid('array')}
        )
        .when(
            Joi.ref('payLoad'),
                {not: Joi.array(), then: Joi.string().valid('object')}
        ).required()
            
        ,
    status: Joi.string().allow(null),
    statusCode: Joi.string().allow(null),
    error: Joi.string().allow(null),
    errorDetail: Joi.object().keys({
        code: Joi.string().allow(null),
        description: Joi.string().allow(null)
    })
})

module.exports = canisterSchema