const express = require('express');
const router = express.Router();
const
    {
        post: { getFollowingUsersPost, getExplorePost, getPost, createPost, updatePost, deletePost, getPostByUserName },
        comment: { createComment, updateComment },
        like: { createLike, deleteLike }
    } = require('../controllers');

router.get('/following', getFollowingUsersPost);
router.get('/explore', getExplorePost);
router.get('/:id?', getPost);
router.get('/user/:user_name', getPostByUserName)

router.post('/', createPost);
router.post('/:id/edit', updatePost);
router.delete('/:id', deletePost);

// commented apis not required for now
// router.get('/:postId/comments', getComment);
// router.get('/:postId/comments/:commentId', getComment);
router.post('/:postId/comments', createComment);
router.post('/:postId/comments/:commentId', updateComment);
router.delete('/:postId/comments/:commentId', updateComment);

router.post('/:postId/like', createLike);
router.delete('/:postId/dislike', deleteLike);

module.exports = router;