const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userData'
    },
    body : {
        type : String,
        required : true,
        minlength : 5
    },
    postId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'blogposts1'
    },
    postedAt : {
        type : Date,
        defauult : Date.now()
    }
})

const comments = mongoose.model('comment', commentSchema);
module.exports = comments