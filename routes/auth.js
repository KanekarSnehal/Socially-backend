const express = require('express');
const router = express.Router();
const { auth: { loginHandler, signupHandler } } = require('../controllers')

router.post('/login', loginHandler);
router.post('/signup', signupHandler);

module.exports = router;