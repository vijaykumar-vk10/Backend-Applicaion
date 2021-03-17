/**
 * @name db.js
 * @description Database connection initilisation
 * @version 1.0
 * @author tharunp
*/

/* Imports */
var mongoose = require('mongoose');

class Mongo {
    constructor(){
       this.connection = null
       //this.URL = "mongodb+srv://vijay:vk10@cluster0.nkua5.mongodb.net/test?retryWrites=true&w=majority"
       this.URL = process.env.DB_URL
    }
       
    getConnection(url) {
        return new Promise( (resolve, reject) =>{
            if(url == null){
                url = this.URL
            }
            this.connection = mongoose.createConnection(url, {useNewUrlParser: true,useUnifiedTopology: true })
            this.connection.on('connected', ()=>{
                resolve(this.connection)
            })
            this.connection.on('error', ()=>{
                reject(" 'Error' while establishing connection")
            })

            this.connection.catch( ()=>{
                reject("Generic Error while establishing connection")
            })
        })
    }

    closeConnection(){
        try {
            this.connection.close()
            return true
        } catch (error) {
            return false
        }
    }

    status(){
        return this.connection.readyState
    }
}

module.exports = {Mongo}



