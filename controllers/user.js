const { user: userRepository } = require('../repository');
const { StatusCodes } = require('../utils/statusCodes');

async function getUsersToFollow(req, res) {
    try {
        const user = await userRepository.getUsersToFollow();

        res.send({
            status: 'success',
            data: user
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

module.exports = {
    getUsersToFollow,
    findUserByUserName,
    updateUser
}