const { user: UserModel, follow: FollowModel } = require('../models');
const { Op } = require('sequelize');

async function findUserByEmailIdAndUserName(emailId, userName) {
    try {
        const response = await UserModel.findOne({
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
        const response = await UserModel.findOne({
            where: {
                user_name: userName
            },
            attributes: ['email_id', 'profile_image', 'full_name', 'user_name', 'id', 'website', 'bio'],
        });
        return response;
    } catch (error) {
        console.log(`[user respository - findUserByUserName] Error: ${error}`);
        throw Error(error);
    }
}

async function updateUser(userName, userData) {
    try {
        const response = await UserModel.update(
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
        const response = await UserModel.create(userDetails);
        return response;
    } catch (error) {
        console.log(`[user respository - createUser] Error: ${error}`);
        throw Error(error);
    }
}

async function getUsersToFollow(userId, search_key = '') {
    const whereClause = {
        id: {
            [Op.ne]: userId   // Exclude the current user from the result
        }
    }
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
        const response = await UserModel.findAll({
            include: {
                model: FollowModel,
                attributes: [],
                required: false,
                where: {
                    current_user: userId,
                    id: {
                        [Op.is]: null   // Check for null values in the 'following' table
                    }
                }
            },
            attributes: ['profile_image', 'full_name', 'user_name', 'id', 'website', 'bio'],
            where: whereClause,
        });
        return response;
    } catch (error) {
        console.log(`[user respository - getUsersToFollow] Error: ${error}`);
        throw Error(error);
    }
}

module.exports = {
    findUserByEmailIdAndUserName,
    findUserByUserName,
    createUser,
    getUsersToFollow,
    updateUser
}