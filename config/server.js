const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config({ path: '.env.local'});

module.exports = {
    PORT: process.env.PORT,
    FRONTEND_URL: process.env.FRONTEND_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_TOKEN_EXPIRY: process.env.JWT_TOKEN_EXPIRY,
    JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY,
    BCRYPT_SALT: bcrypt.genSaltSync(10),
    BCRYPT_ROUNDS: 10
}