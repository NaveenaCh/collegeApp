module.exports = function(mongoose) {
 
    
    var mongoose= require('mongoose');
    var Schema = mongoose.Schema;
    var teacherSchema = new Schema({
        teachername: String,
        qualification: String,
        mail: String,
        phone_num: String
    });

    var teacher = mongoose.model('teacher', teacherSchema);
    return teacher;
};