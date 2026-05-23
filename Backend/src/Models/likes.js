const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'userData'
        }
    ],
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'blogposts1',
    },
})

const likes = mongoose.model("like", likeSchema)
module.exports = likes;