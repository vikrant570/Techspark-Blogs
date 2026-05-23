const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//WILL ADD NPM VALIDATORS FOR MORE PRECISION AND LESS HARDWORK
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        minlength : 5,
        match : [/^(?=.*[A-Za-z])(?=.*\d).+$/,"Username must have alpha-numeric combination !"],
        unique : true,
        trim : true
    },
    name : {
        type : String,
        minlength : 5,
    },
    email : {
        type : String,
        required : true,
        minlength : 15,
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please Enter a valid email address."],
        unique : [true, "Email is already in use !"],
        trim : true,
        immutable : [true, "You cannot change your email address !"]
    }, 
    password: {
        type: String,
        required: [true, "Please create a password."],
        minlength: [8, "Password length must be more than 7 characters."],
        match : [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, "Password must have (at least) : An upper case alphabet, A lower case alphabet, A number , A special character ! "],
        trim: true
    },
    role :{
        type : String,
        enum : ['user', 'admin']
    },
    totalPosts : {
        type : Number,
        default : 0
    }
},{timestamps: true})

userSchema.pre('save', async function (next){
    if(!this.isModified("password")){
        return next();
    }
    
    const hashedPass = await bcrypt.hash(this.password, 10)
    this.password = hashedPass;
    next();
})

const Users = mongoose.model('userData', userSchema);
module.exports = Users