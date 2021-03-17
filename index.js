/**
 * @name Results
 * @description Handles Results of various entities
 * @version 1.0
 * @author vijaykumar
 * 
 * @todo
 *      1. Time out for DB
 *      2. Subject
 */

 /* Imports */
 var express = require('express')
 var PORT = process.env.PORT || 3001
 require('dotenv').config();
 
 /* Service Import */
var resultRouter = require('./lib/results/results')
 
 /* Init */
 var app = express()
 
 /* Routers */
 app.use('/result', resultRouter)

 app.get('/test', (Request, Response) =>{
     Response.json("Test Endpoint DB_URL final-test-kavi -"+Date.now())
 })
 
 /* Server Init */
 app.listen(PORT, (err, data)=> {
     console.log("Server Started on - "+PORT)
 })
 