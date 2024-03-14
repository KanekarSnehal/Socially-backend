const express = require('express');
const router = express.Router();
const
    {
        post: { getFollowingUsersPost, getExplorePost, getPost, createPost, updatePost, deletePost, getPostByUserName, getBookmarkedPosts },
        comment: { createComment, updateComment },
        like: { createLike, deleteLike },
        bookmark: { createBookmark, deleteBookmark }
    } = require('../controllers');

router.get('/following', getFollowingUsersPost);
router.get('/explore', getExplorePost);
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

router.get('/bookmarks', getBookmarkedPosts);
router.post('/:postId/bookmarks', createBookmark);
router.delete('/:postId/unbookmarks', deleteBookmark);

// add route at end so that it doesn't conflict with other routes
router.get('/:id?', getPost);
module.exports = router;