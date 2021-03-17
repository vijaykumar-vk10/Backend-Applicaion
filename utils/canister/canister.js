/* Canister Object */
/*Imports */
var canisterSchema = require('./canisterSchema')
var Joi = require('@hapi/joi')
/**
 * @todo
 * 1. Build Canister Object
 * 2. Clone Canister Object
 * 3. Validate Canister Object
 */

 class Canister {

    /* Init */
    constructor( service, subservice){
        this.Object = {

            metadata: { 
               timeStamp: new Date().toISOString(), 
               service: service,
               subService: subservice 
            }, 
            payLoad: null, 
            payLoadType: null, 
            status: null, 
            statusCode: null, 
            errorDetail: { 
                code: null, 
                description: null 
            } 
        }
    }

    /**
     * @name addError
     * @description Add error to the cannister object
     * @param {String} errorCode 
     * @param {String} description 
     */
    addError(errorCode, description){
        try {
            this.Object.errorDetail = {}
            this.Object.errorDetail.code = errorCode
            this.Object.errorDetail.description = description
            return true
        } catch (error) {
            return false
        }
    }

    /**
     * @name addStatus
     * @description Add Status to the canister Object
     * @param {string} status 
     * @param {string} statusCode 
     */
    addStatus(status, statusCode){
        this.Object.status = status
        this.Object.statusCode = statusCode
        return true
    }

    /**
     * @name addPayLoad
     * @description Add Payload to the Canister Object
     * @param {sting} payload
     * @param {sting} payLoadType
     */
    async addPayload(payLoad){

        try {
            this.Object.payLoad = payLoad
            if (Array.isArray(payLoad)) {
                this.Object.payLoadType = "array"
            }
            else {
                this.Object.payLoadType = "object"
            }
            var validationStatus = await this.validate(this.Object)

        } catch (error) {
            console.log(error)
            throw error
        }
        
    }

    /**
     * @name fromJSON
     * @description Converts JSON to Canister Obj
     * @param {JSON} obj 
     */
    async fromJSON(obj){
        try {
            var error= await canisterSchema.validateAsync(obj)
            this.Object = obj
            return true
        } catch (error) {
            throw error 
        }
    }

    /**
     * @name JSON
     * @description Returns the Canister object in JSON format
     * @returns {JSON}
     */
    JSON(){
        return this.Object
    }

    /**
     * @name JSONString
     * @description Returns stringified Canister object
     * @returns {String}
     */
    JSONString(){
        return JSON.stringify(this.Object)
    }


    /**
     * @name validate
     * @description Validates JSON for Canister Obj 
     * @param {JSON} obj 
     * @returns {Object}
     *  {
     *      "status":bool,
     *      "error":String
     *  } 
     */
    async validate( obj ){

        try{
            var {error} = await canisterSchema.validateAsync(obj)
            return true
        }
        catch(error){
            throw error.details[0].message+"___"
        }
       
    }


    
 }

 module.exports = Canister