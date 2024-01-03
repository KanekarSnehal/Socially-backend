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
            attributes: ['email_id', 'password', 'profile_image', 'full_name', 'user_name'],
        });
        return response;
    } catch (error) {
        console.log(`[post respository - getPostById] Error: ${error}`);
        throw Error(error);
    }
}

async function createUser(userDetails) {
    try {
        const response = await UserModel.create(userDetails);
        return response;
    } catch (error) {
        console.log(`[post respository - createUser] Error: ${error}`);
        throw Error(error);
    }
}

module.exports = {
    findUserByEmailIdAndUserName,
    createUser
}