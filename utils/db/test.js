var {Mongo} = require('./db')
var mongoose = require('mongoose')


var db = new Mongo()

async function dbT() {
    try {
        if(await db.getConnection()){
            
            console.log(db.status())
            db.closeConnection()
        }
        
    } catch (error) {
        console.log("connection fail")
    }
    
}

dbT()