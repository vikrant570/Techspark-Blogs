const Blogs = require("../../Models/blogStructure");
const Likes = require("../../Models/likes");

// EDITING EXISTING POSTS
const editPost = async (req, res) => {
  try {
    const post = await Blogs.findById(req.params.id);

    const { title, subject, body, regards } = req.body;

    post.title = title || post.title;
    post.subject = subject || post.subject;
    post.body = body || post.body;

    if (regards) {
      post.regards.name = regards.name;
      post.regards.email = regards.email;
    }

    const newPost = await post.save();

    res.status(201).json({
      success: "Post updated successfullyy...",
      post: {
        title: newPost.title,
        subject: newPost.subject,
        body: newPost.body,
      },
    });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

// FETCHING POST BY ID
const fetchByID = async (req, res) => {
  try {
    /*.populate([
            {
                path : "regards",
                select : "email name -_id"
            },
            {
                path : "comments",
                select : "user body -_id",
                populate : {
                    path : "user",
                    select : "username -_id"
                }
                
            }
        ]) */

    const post = await Blogs.findById(req.params.id).lean();

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post doesn't exist !" });
    }

    // WILL DESTRUCTURE THEM IN FRONTEND WHEN NEEDED
    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(404).json({ Error: err.message });
  }
};

// CREATING A NEW POST
const createPost = async (req, res) => {
  try {
    const { title,banner, subject, body, category, tags } = req.body;
    const regards = req.user.id;

    const newBlog = new Blogs({
      title,
      banner,
      subject,
      body,
      regards,
      tags,
      category,
      likes: 0,
    });
    const newPost = await newBlog.save();
    await Likes.create({ likes: [], post: newPost._id });

    res.status(201).json({ success: true, newPost });
  } catch (err) {
    res.status(404).send(`Error! ${err.message}. \n Please try again...`);
  }
};

// FETCH POSTS BY USER
const fetchByUser = async (req, res) => {
  try {
    const myPosts = await Blogs.find({ regards: req.user.id }).lean();
    if (!myPosts) {
      return res.status(404).json({ message: "No posts found !" });
    }

    res.status(200).json({ success: true, posts: myPosts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//DELETE POST
const deletePost = async (req, res) => {
  try {
    await Blogs.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

const searchByCategory = async (req, res) => {
  const { category } = req.query;
  const cleanedCat = category?.trim();
  try {
    const posts = await Blogs.find(
      { category: cleanedCat },
      { body: 0, comments: 0 }
    ).lean();
    res.status(200).json({ success: true, posts: posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllTerms = async (req, res) => {
  const { term } = req.query;
  if (!term) {
    return [];
  }

  // Create a case-insensitive regex for the term as a word prefix
  let regexp = new RegExp(`\\b${term}`, "i");

  // Aggregation pipeline to extract matching words
  const pipeline = [
    {
      // Match documents where title, subject, or tags contain the term
      $match: {
        $or: [
          { title: regexp },
          { subject: regexp },
          { category: regexp },
          { tags: { $elemMatch: { $regex: regexp } } },
        ],
      },
    },
    {
      // Project to extract words from title, subject, and tags
      $project: {
        words: {
          $setUnion: [
            { $split: ["$title", " "] }, // Split title into words
            { $split: ["$subject", " "] }, // Split subject into words
            { $split: ["$category", " "] }, // Split subject into words
            "$tags", // Tags are already an array
          ],
        },
      },
    },
    {
      // Unwind the words array to process each word individually
      $unwind: "$words",
    },
    {
      // Match words that start with the term (case-insensitive)
      $match: {
        words: regexp,
      },
    },
    {
      // Group to get unique words
      $group: {
        _id: { $toLower: "$words" }, // Case-insensitive grouping
        word: { $first: "$words" },
      },
    },
    {
      // Project to return only the word
      $project: {
        _id: 0,
        word: 1,
      },
    },
    {
      // Sort alphabetically
      $sort: {
        word: 1,
      },
    },
    {
      // Limit the number of suggestions (e.g., 10)
      $limit: 10,
    },
  ];

  try {
    const matchingWords = await Blogs.aggregate(pipeline);
    const words = matchingWords.map((item) => item.word);
    return res.status(200).json(words);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const searchByTerm = async (req, res) => {
  const { term } = req.query;
  const escapeRegex = (term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const safeTerm = escapeRegex(term);
  const regexp = new RegExp(`\\b${safeTerm}\\b`, "i")

  if (!term) {
    return res.status(404).json({ success: false, message: "Bad request !" });
  }

  const posts = await Blogs.find(
    {
      $or: [
        { title: regexp },
        { category: regexp },
        { subject: regexp },
        { tags: regexp},
      ],
    },
    {
      body: 0,
      comments: 0,
    }
  );

  return res.status(200).json({ success: true, posts: posts });
};

module.exports = {
  fetchByID,
  editPost,
  createPost,
  fetchByUser,
  deletePost,
  searchByCategory,
  getAllTerms,
  searchByTerm,
};