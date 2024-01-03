const express = require('express');
const router = express.Router();
const { post: { getFollowingUsersPost, getExplorePost, getPost } } = require('../controllers');

router.get('/following', getFollowingUsersPost);
router.get('/explore', getExplorePost);
router.get('/:id?', getPost);

module.exports = router;