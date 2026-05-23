const mongoose = require('mongoose');
const valid = require('validator')

const otpSchema = new mongoose.Schema({
    otp : Number,
    email : {
        type : String,
        required : true,
        validator : {
            validate : (m) => valid.isEmail(m)
        }
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    }
}, {expireAfterSeconds : 90})

const otp = mongoose.model('otp', otpSchema);
module.exports = otp;