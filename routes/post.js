const express = require('express');
const router = express.Router();
const { post: { getFollowingUsersPost, getExplorePost, getPost, createPost, updatePost, deletePost, getPostByUserName } } = require('../controllers');

router.get('/following', getFollowingUsersPost);
router.get('/explore', getExplorePost);
router.get('/:id?', getPost);
router.get('/user/:user_name', getPostByUserName)

router.post('/', createPost);
router.post('/:id/edit', updatePost);
router.delete('/:id', deletePost);

module.exports = router;