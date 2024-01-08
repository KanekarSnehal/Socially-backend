const express = require('express');
const router = express.Router();
const { auth: { authenticateUser } } = require('../middlewares');

router.use('/auth', require('./auth'));
router.use(authenticateUser);
router.use('/posts', require('./post'));
router.use('/users', require('./user'));

module.exports = router;