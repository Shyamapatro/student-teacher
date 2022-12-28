const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
    {
       
       firstName: { type: String, required: true },
       lastName: { type: String, required: true },
       email:{type:String ,require:true},
       password:{type:String,require:true},
       gender:{type:String,require:true},
       isDeleted:{type:Boolean},
       passwordResetToken:{type:String},
       accessToken:{type:String},
       favTeacher: [{type: Schema.Types.ObjectId,ref: 'teacher'}],


    },
    {
        timestamps: true
    }
)


const Student = mongoose.model('student', StudentSchema);

module.exports = Student;
