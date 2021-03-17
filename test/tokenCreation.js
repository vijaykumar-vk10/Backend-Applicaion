/* Imports */
var jwt = require('jsonwebtoken')

/* Consts & Statics*/
const ACCESS_TOKEN_SECRETE="19907497d6ef186c2e99b81798263404ae5b36bb2da0590017b609ec1465d7e03fda91cf8da1087f28ad200d6bf227252102cc700e59045f8d6556a89521c8e9"
const REFRESH_TOKEN_SECRETE="a461a5237105dc88e13aa37539a0e7b0fa4f74105bee731b942414a14949e2b296a0e5964e365e3b6a24f43839bda34511799458e0112b92a50fcf1399b594c3"

var ACCESS_TOKEN_PAYLOAD = {
    "user": "123",
    "primaryRole":"management",
    "id":"5ef217da6474ba49a3f81cdd",
    "secondaryRole":"",
    "timestamp": Date.now()
}

var ACCESS_TOKEN = jwt.sign(ACCESS_TOKEN_PAYLOAD, ACCESS_TOKEN_SECRETE)
var REFRESH_TOKEN = jwt.sign(ACCESS_TOKEN_PAYLOAD, REFRESH_TOKEN_SECRETE)

console.log("Access Token -> ", ACCESS_TOKEN)
//console.log("Refresh Token -> ", REFRESH_TOKEN)

var ACCESS_TOKEN_DECODED =  jwt.verify(ACCESS_TOKEN, ACCESS_TOKEN_SECRETE)
console.log(ACCESS_TOKEN_DECODED)
try {
    var a = 3
    console.log("Error Starterd")
    if( a== 1){
        throw {"name" : "Error 1"}
    }
    if( a== 2){
        throw {"name" : "Error 2"}
    }
    if( a== 3){
        throw {"name" : "Error 3"}
    }
} catch (error) {
    console.log ("Caught -> ",error.name)
    
}