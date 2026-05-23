const express = require('express');
const router = express.Router();
const Blogs = require('../Models/blogStructure');

const interactions = require('../routes/postInteractions');

//CONTROLLERS....
const post = require('../Controllers/Posts/postHandler');

//MIDDLEWARES
const isLoggedIn = require('../Middlewares/loggedInCheckMiddleware');

// OWNERSHIP CONTROL MIDDLEWARE...
const isOwner = async (req, res, next) =>{
    //When a user click on edit post OR to whom show the edit post button logic
    try{
         //the post clicked on will pass its id to the param..
        const post = await Blogs.findById(req.params.id);

        if (!post){
            return res.status(404).json({success: false, message: "Post doesn't exist !"})
        }

        if(post.regards?.toString() === req.user.id){
            next();
        } else {
            return res.status(401).json({success : false, message : "You are not the owner of the post!"})
        }
    } catch(err){
        res.status(500).json({success : false, message : err.message})
    }
    
}

router.get('/', async(req,res)=>{
    res.status(200).json({message: 'Featured or HOT Posts Here !'})
})

router.get('/explore/:no', async(req,res)=>{
    const pageNumber = req.params.no > 1 ? req.params.no : 1;

    try{
        const posts = await Blogs.find({},{body : 0}).skip((pageNumber-1)*10).limit(10);
        res.status(200).json({success:true, posts});
    } catch (err){
        res.status(500).json({success:false, message:err.message})
    }
})

//CRUD OPERATIONS FOR POSTS..
router.post('/',isLoggedIn ,post.createPost);      
router.get('/myposts', isLoggedIn, post.fetchByUser);    
router.get('/myposts/:id', post.fetchByID);          //When user clicks on read post on his own post in myPosts menu             
router.delete('/myposts/:id', isLoggedIn, isOwner, post.deletePost);
router.patch('/myposts/:id', isLoggedIn, isOwner, post.editPost);    

router.get('/categorize', post.searchByCategory);                           // SEARCH BY CATEGORY AND TAGS
router.get('/search', post.getAllTerms);                              // SEARCH USING SEARCH BAR
router.get('/searchResults', post.searchByTerm)                        // GET ALL RESULTS RELATED TO TERM
router.use('/interact/:id', isLoggedIn, interactions);                 // COMMENTS AND LIKES

router.get('/:id', post.fetchByID);

module.exports = router;