const express = require('express');
const router = express.Router();
const { post: { getFollowingUsersPost, getExplorePost, getPost } } = require('../controllers');

router.get('/:id?', getPost);
router.get('/following', getFollowingUsersPost);
router.get('/explore', getExplorePost);

module.exports = router;