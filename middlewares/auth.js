const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require("../config/server");
const { StatusCodes } = require('../utils/statusCodes');

/**
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next 
 */
function authenticateUser(req, res, next) {
    // Get the access token from the cookie
    const access_token = req.headers.cookie ? req.headers.cookie.split('=')[1] : null;

    // Check if the token exists
    if (!access_token) return res.status(StatusCodes.UNAUTHORIZED).send({
        message: 'Access denied. No token provided.',
        status: 'failure'
    });

    try {
        // Verify and decode the token
        const decoded = jwt.verify(access_token, JWT_SECRET_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        // Token verification failed
        console.log("authenticateUser Middleware", error);
        return res.status(StatusCodes.UNAUTHORIZED).send({
            message: error.message,
            status: 'failure'
        });
    }

}

module.exports = {
    authenticateUser,
}