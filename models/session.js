const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema(
    {
       
       userId:{type:String},
       accessToken:{type:String},

    },
    {
        timestamps: true
    }
)


const Session = mongoose.model('session', SessionSchema);

module.exports = Session;
