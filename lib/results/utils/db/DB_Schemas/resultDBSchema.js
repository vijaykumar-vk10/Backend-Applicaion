/**
 * @name ResulttDBSchema
 * @author vijaykumar
 * @author 1.0
 */


var mongoose = require('mongoose');

var resultDBSchema = new mongoose.Schema({
    schoolID : String,
    section: String,
    classID: String,
    assismentID: String,
    postedDate: Date,
    teacherID: String,
    studentID: String,
    result : [
        {
            subjectID : String,
            marks : Number,
            fullMark : Number,
            review : String,
            passPercentage : Number,
        }
    ],

});


var getResultDBModel = function (conn) {
    return conn.model('result', resultDBSchema);
}


module.exports = {
    resultDBSchema,
    getResultDBModel
}