/**
 * @name Logger
 * @description Winston Logger for Logging 
 * @version 1.0
 * @author tharunp
 */

/* Import */
var Winston = require('winston')

/* Custome Logging levels */
var customLevels = {
    levels:{
        
            error: 0, 
            warn: 1, 
            info: 2, 
            http: 3,
            verbose: 4, 
            debug: 5, 
            silly: 6   
    }
}
/* Logger 1 -> Debug and Verbose Logger */
const debugLogger = Winston.createLogger(
    {
        levels: customLevels.levels,
        format: Winston.format.combine(
            Winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            Winston.format.json()
        ),
        transports: [    
            new Winston.transports.File({ filename: 'debug.log' ,maxsize: '100000', level: 'silly' })
        ]
    }
);

/* Logger 2 -> Request Logger */
const requestLogger = Winston.createLogger(
    {
        //levels: CustomLevels.levels,
        format: Winston.format.combine(
            Winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            Winston.format.json()
        ),
        transports: [
            new Winston.transports.File({ filename: 'Request.log',maxsize: '100000'})
        ]
    }
);

/* Logger 3 -> Error Logger */
const errorLogger = Winston.createLogger(
    {
        //levels: CustomLevels.levels,
        format: Winston.format.combine(
            Winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            Winston.format.json()
        ),
        transports: [
            new Winston.transports.File({ filename: 'Error.log',maxsize: '100000'})
        ]
    }
);

/* Custom Wrapper functions for logger */
logInfo = function(infoMessage, meta){
    debugLogger.log('info',infoMessage)
}

logVerbose = function(infoMessage ,meta){
    debugLogger.log('verbose',infoMessage)
}

logDebug = function(infoMessage, meta){
    if(meta){
        debugLogger.log({
            level: 'debug',
            message: infoMessage,
            meta:meta
        })
    } else{ debugLogger.log({level: 'debug', message: infoMessage})}
}

logRequest = function(requestMessage, meta){
    if(meta){
        requestLogger.log( {
            level: 'info',
            message: requestMessage,
            meta: meta
        })
    }else{requestLogger.log('info',requestMessage)}
}

logError = function(errorMessage, meta){
    if(meta){  
        errorLogger.log({
            level:'error', 
            message:errorMessage, 
            meta:meta
        })
    }else{ errorLogger.log('error', errorMessage) }
}

module.exports ={
    logInfo,
    logVerbose,
    logDebug,
    logRequest,
    logError
}