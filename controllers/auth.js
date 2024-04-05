const { StatusCodes } = require('../utils/statusCodes');
const bcrypt = require('bcrypt');
const { user: UserRepository } = require('../repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, JWT_TOKEN_EXPIRY, BCRYPT_SALT } = require("../config/server");


/**
 * Login user with email and password
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function loginHandler(req, res) {

    try {
        // Validate request body
        const { email_id, password, user_name } = req.body;

        // check if user exists and password is correct
        const user = await UserRepository.findUserByEmailIdAndUserName(email_id, user_name);

        if (!user || !user.password) {
            throw Error('The e-mail address and/or password you specified are not correct.');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw Error('Incorrect password');
        }

        // sign token 
        const payload = {
            email_id: user.email_id,
            role: user.role,
            full_name: user.full_name,
            user_name: user.user_name,
            user_id: user.id
        };

        const access_token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_TOKEN_EXPIRY });

        // Send response
        res.cookie('access-token', access_token, {
            expires: new Date(Date.now() + 86400000), // Cookie expiration date (in this case, 1 day)
            secure: true, // Send the cookie only over HTTPS
            // httpOnly: true, // The cookie is inaccessible to JavaScript code in the browser
            path: '/', // The path where the cookie is valid (e.g., '/' means it's valid for all routes)
            sameSite: 'None', // Restrict the cookie to same-site requests
            domain: 'localhost'
        });

        res.set('Content-Type', 'application/json'); // Set the response header to JSON

        res.json(
            {
                status: "success",
                message: 'User logged in successfully',
                data: {
                    email_id: user.email_id,
                    profile_image: user.profile_image,
                    full_name: user.full_name,
                    user_name: user.user_name,
                    id: user.id
                }
            }
        );
    } catch (error) {
        console.log("[auth controller-loginHandler] Error: ", error);
        return res.status(StatusCodes.BAD_REQUEST).send({
            status: "failure",
            message: error.message
        });
    }

}

/**
 * Signup user with email, password and name
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function signupHandler(req, res) {
    try {
        // Validate request body
        const { email_id, password, user_name } = req.body;

        // check if user exists then throw error
        const user = await UserRepository.findUserByEmailIdAndUserName(email_id, user_name);

        if (user) {
            return res.status(StatusCodes.CONFLICT).send({
                status: 'failure',
                message: 'A user is already registered with this e-mail address or username'
            });
        }
        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);

        // create user
        await UserRepository.createUser({ ...req.body, password: hashedPassword });

        // Send response
        res.status(StatusCodes.OK).json({ status: "success", message: 'User signup successfully' });

    } catch (error) {
        console.log("[auth controller-signupHandler] Error: ", error);
        return res.status(StatusCodes.BAD_REQUEST).send({
            status: 'failure',
            message: error.message
        });
    }
}

module.exports = {
    loginHandler,
    signupHandler
}