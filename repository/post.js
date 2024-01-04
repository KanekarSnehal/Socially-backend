const { post: postModel, user: userModel } = require('../models');
const sequelize = require('../connections/mysql')

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
        throw Error(error);
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
        throw Error(error);
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
        throw Error(error);
    }
}

async function getExplorePost() {
    try {
        const response = await postModel.findAll();
        return response;
    } catch (error) {
        console.log(`[post respository - getExplorePost] Error: ${error}`);
        throw Error(error);
    }
}

async function createPost(description, created_by) {
    try {
        const response = await postModel.create(
            {
                description,
                created_by
            }
        );
        return response;
    } catch (error) {
        console.log(`[post respository - createPost] Error: ${error}`);
        throw Error(error);
    }
}

async function updatePost(description, postId) {
    try {
        const response = await postModel.update(
            { description },
            {
                where:
                {
                    id: postId
                }
            });
        return response;
    } catch (error) {
        console.log(`[post respository - updatePost] Error: ${error}`);
        throw Error(error);
    }
}

async function deletePost(postId) {
    try {
        const response = await postModel.destroy(
            {
                where:
                {
                    id: postId
                }
            });
        return response;
    } catch (error) {
        console.log(`[post respository - deletePost] Error: ${error}`);
        throw Error(error);
    }
}

async function getPostByUserName(userName) {
    try {
        const response = await postModel.findAll({
            include: [
                {
                    model: userModel,
                    attributes: [],
                    on: {
                        id: sequelize.literal('`Post`.`created_by`')
                    },
                    where: {
                        user_name: userName
                    },
                    required: true // This ensures that the join is an INNER JOIN, similar to the LEFT JOIN in SQL
                }
            ],
        });
        return response;
    } catch (error) {
        console.log(`[post respository - getPostByUserName] Error: ${error}`);
        throw Error(error);
    }
}

module.exports = {
    getPostById,
    getPostByUserId,
    getFolllowingUsersPost,
    getExplorePost,
    createPost,
    updatePost,
    deletePost,
    getPostByUserName
}