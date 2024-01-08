const { user: UserModel } = require('../models');
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

async function getUsersToFollow() {
    try {
        const response = await UserModel.findAll();
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