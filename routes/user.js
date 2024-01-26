const express = require('express');
const router = express.Router();
const { user: { getUsersToFollow, findUserByUserName, updateUser } } = require('../controllers');

router.get('/follow', getUsersToFollow);
router.get('/:userName', findUserByUserName);
router.post('/:userName', updateUser);
module.exports = router;