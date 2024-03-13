const { user: userModel, follow: followModel } = require('../models');
const { Op, Sequelize } = require('sequelize');

async function findUserByEmailIdAndUserName(emailId, userName) {
    try {
        const response = await userModel.findOne({
            where: {
                [Op.or]: [
                    { email_id: emailId },
                    { user_name: userName }
                ]
            },
            attributes: ['email_id', 'password', 'profile_image', 'full_name', 'user_name', 'id', 'website', 'bio'],
        });
        return response;
    } catch (error) {
        console.log(`[user respository - findUserByEmailIdAndUserName] Error: ${error}`);
        throw Error(error);
    }
}

async function findUserByUserName(userName) {
    try {
        const response = await userModel.findOne({
            where: {
                user_name: userName
            },
            attributes: ['email_id', 'profile_image', 'full_name', 'user_name', 'id', 'website', 'bio'],
            include: [
                {
                    model: followModel,
                    as: 'following',
                    attributes: ['following_user'],
                },
                {
                    model: followModel,
                    as: 'follower',
                    attributes: ['following_user'],
                },
            ],
        });
        return response;
    } catch (error) {
        console.log(`[user respository - findUserByUserName] Error: ${error}`);
        throw Error(error);
    }
}

async function updateUser(userName, userData) {
    try {
        const response = await userModel.update(
            {
                ...userData
            },
            {
                where: {
                    user_name: userName
                },
            });
        return response;
    } catch (error) {
        console.log(`[user respository - updateUser] Error: ${error}`);
        throw Error(error);
    }
}

async function createUser(userDetails) {
    try {
        const response = await userModel.create(userDetails);
        return response;
    } catch (error) {
        console.log(`[user respository - createUser] Error: ${error}`);
        throw Error(error);
    }
}

async function getUsersToFollow(userId, followingUsers, search_key = '') {
    const whereClause = {
        id: {
            [Op.notIn]: followingUsers.concat(userId)   // Exclude the current user from the result
        }
    };
    if(search_key) {
        whereClause[Op.or] = [
            {
                full_name: {
                    [Op.like]: search_key
                }
            },
            {
                user_name: {
                    [Op.like]: search_key
                }
            }
        ]
    }
    try {
        const response = await userModel.findAll({
            where: whereClause,
            attributes: ['profile_image', 'full_name', 'user_name', 'id', 'website', 'bio'],
        });
        return response;
    } catch (error) {
        console.log(`[user respository - getUsersToFollow] Error: ${error}`);
        throw Error(error);
    }
}

async function followUnfollowUser(followUnfollowUserId, action, userId) {
    try {
        const response = action == 'follow' ? await followModel.create({
            current_user: userId,
            following_user: followUnfollowUserId
        }) : await followModel.destroy({
            where: {
                current_user: userId,
                following_user: followUnfollowUserId
            }
        });
        return response;
    } catch (error) {
        console.log(`[user respository - followUnfollowUser] Error: ${error}`);
        throw Error(error);
    }
}

async function getFollowingUsers(userId) {
    try {
        const response = await followModel.findAll({
            where: {
                current_user: userId
            },
            attributes: ['following_user'],
        });
        return response;
    } catch (error) {
        console.log(`[user respository - getFollowingUsers] Error: ${error}`);
        throw Error(error);
    }
}

module.exports = {
    findUserByEmailIdAndUserName,
    findUserByUserName,
    createUser,
    getUsersToFollow,
    updateUser,
    followUnfollowUser,
    getFollowingUsers
}