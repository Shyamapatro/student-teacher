const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema(
    {
       
       firstName: { type: String, required: true },
       lastName: { type: String, required: true },
       email:{type:String ,require:true},
       subject:{type:String,require:true},
       gender:{type:String,require:true},
       favStudent: [{
        type: Schema.Types.ObjectId,
        ref: 'student'
     }],
     
     Count:{type:Number}

    },
    {
        timestamps: true
    }
)


const Teacher = mongoose.model('teacher', TeacherSchema);

module.exports = Teacher;
