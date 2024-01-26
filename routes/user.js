const express = require('express');
const router = express.Router();
const { user: { getUsersToFollow, findUserByUserName, updateUser, followUnfollowUser } } = require('../controllers');

router.get('/follow', getUsersToFollow);
router.get('/:userName', findUserByUserName);
router.post('/:userName', updateUser);
router.post('/:followUnfollowUserId/follow-unfollow', followUnfollowUser);
module.exports = router;