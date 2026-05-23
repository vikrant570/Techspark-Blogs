const Comments = require('../../Models/comments');
const Blogs = require('../../Models/blogStructure');
const Likes = require('../../Models/likes');

// POSTING NEW COMMENTS..
const newComment = async (req, res) =>{

    try {
        const postId = req.params.id;
        const post = await Blogs.findById(postId);
    
        const {body} = req.body;
        const newCmt = new Comments({user: req.user.id, body: body, postId : postId});
        await newCmt.save();

        post.comments.push(newCmt);
        await post.save();
        
        res.status(201).json({success: true, message: "Commented Successfully."});
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
}

const handleLikes = async (req,res)=>{
    const postId = req.params.id;
    const postLikes = await Likes.findOne({post:postId});
    const post = await Blogs.findById(postId);

    const isDoubleLike = postLikes.likes.includes(req.user.id);
    if(isDoubleLike){
        return res.status(401).json({message: "You already liked the post !"})
    }

    postLikes.likes.push(req.user.id);
    postLikes.save();
    post.likes+= 1;
    post.save();
    res.status(201).json({success: true, message: "Post Liked", totalLikes: postLikes.length});
}

module.exports = {newComment, handleLikes};