const { post: postModel } = require('../models');

/**
 * @typedef Post
 * @property {string} description
 */

async function getPostById(postId) {
    try {
        const response = await postModel.findByPk(postId);
        return response;
    } catch (error) {
        console.log(`[post respository - getPostById] Error: ${error}`);
    }
}

async function getPostByUserId(userId) {
    try {
        const response = await postModel.findOne({
            where: {
                user_id: userId
            }
        });
        return response;
    } catch (error) {
        console.log(`[post respository - getPostById] Error: ${error}`);
    }
}

/**
 * get all post
 * @returns 
 */
async function getFolllowingUsersPost() {
    try {
        const response = await postModel.findAll();
        return response;
    } catch (error) {
        console.log(`[post respository - getFolllowingUsersPost] Error: ${error}`);
    }
}

async function getExplorePost() {
    try {
        const response = await postModel.findAll();
        return response;
    } catch (error) {
        console.log(`[post respository - getExplorePost] Error: ${error}`);
    }
}

module.exports = {
    getPostById,
    getPostByUserId,
    getFolllowingUsersPost,
    getExplorePost,
}