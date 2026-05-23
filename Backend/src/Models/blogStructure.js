const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title : {
        required : true,
        type : String,
        minlength : 5,
    },
    subject:{
        type : String,
        minlength : 10
    },
    body:{
        type : String,
        minlength : 50,
        required : true,
    },
    regards : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userData'
    },
    comments :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'comment'
        }
    ],
    tags : {
        type : Array,
        validate : {
            validator : function (tags){
                    return tags.every(tag=>/^[A-Za-z]+$/.test(tag))
            },
            message : "Tags can only have alphabets !"
        },
        lowercase : true
    },
    category:{
        type : String,
        match : [/^[A-Za-z]+$/ , "Category names can't have special characters or numbers !"],
        required : true
    },
    likes : {
        type : Number
    }
}, {
    timestamps : true
})

const blog = mongoose.model('blogposts1', blogSchema);
module.exports = blog;