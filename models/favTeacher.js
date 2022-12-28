const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
    {
       
       studentId: { type: String, required: true },
       teacherId: { type: String, required: true },
       isDeleted:{type:Boolean}

    },
    {
        timestamps: true
    }
)


const Student = mongoose.model('student', StudentSchema);

module.exports = Student;
