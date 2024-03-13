const { user: userRepository } = require('../repository');
const { StatusCodes } = require('../utils/statusCodes');

async function getUsersToFollow(req, res) {
    try {
        const { user_id } = req.user;
        const { search_key } = req.query;
        const followingUsers = await userRepository.getFollowingUsers(user_id);
        const users = await userRepository.getUsersToFollow(user_id, followingUsers.map(u => u.following_user), search_key);

        res.send({
            status: 'success',
            data: users
        });
    } catch (error) {
        console.log(`[user controller - getUsersToFollow] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}

async function findUserByUserName(req, res) {
    try {
        const { userName } = req.params;
        const user = await userRepository.findUserByUserName(userName);

        res.send({
            status: 'success',
            data: user
        });
    } catch (error) {
        console.log(`[user controller - findUserByUserName] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}

async function updateUser(req, res) {
    try {
        const { userName } = req.params;
        const { action, data } = req.body;
        if (action != 'update' || !data || !userName) return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'action/data/userName is missing/invalid'
        });

        const user = await userRepository.updateUser(userName, data[0]);

        res.send({
            status: 'success',
            message: 'User details updated successfully'
        });
    } catch (error) {
        console.log(`[user controller - updateUser] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}

async function followUnfollowUser(req, res) {
    try {
        const { followUnfollowUserId } = req.params;
        const { action } = req.body;
        const { user_id } = req.user;

        if (!followUnfollowUserId || !action) return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'action/followUnfollowUserId is missing/invalid'
        });

        const user = await userRepository.followUnfollowUser(followUnfollowUserId, action, user_id);

        res.send({
            status: 'success',
            message: `User ${action}ed successfully`
        });
    } catch (error) {
        console.log(`[user controller - followUnfollowUser] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}

module.exports = {
    getUsersToFollow,
    findUserByUserName,
    updateUser,
    followUnfollowUser
}