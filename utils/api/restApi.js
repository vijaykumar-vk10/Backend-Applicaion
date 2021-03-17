const fetch = require('node-fetch');

/**Create Get API */

const getRestAPI = async function(url,token){
    try{
        /**Set Headers */
        var headers = {'Accept': "application/json" };
        headers['ACCESS_TOKEN'] = token
        var options = {
            method : "GET",
            headers : headers,
        }
        //console.log(options)
        var resultSet = await fetch(url,options)
        result = await resultSet.json()
        var returnObject = {
            response: result,
            error: null
        }
        return returnObject
    }
    catch(error){
        //Result Object
        var returnObject = {
            response: null,
            error: error
        }
        return returnObject
    }
}

module.exports = getRestAPI