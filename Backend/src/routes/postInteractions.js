const express = require('express');
const router = express.Router()

const IntHandler = require('../Controllers/Posts/interactionHandler');

router.post('/comment', IntHandler.newComment);
router.post('/like', IntHandler.handleLikes);

module.exports = router;