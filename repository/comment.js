const { Op } = require('sequelize');
const { comment: commentModel } = require('../models');

async function createComment(content, post_id, created_by) {
    try {
        const response = await commentModel.create(
            {
                content,
                post_id,
                created_by
            }
        );
        return response;
    } catch (error) {
        console.log(`[comment respository - createComment] Error: ${error}`);
        throw Error(error);
    }
}

async function updateComment(content, commentId, postId) {
    try {
        const response = await commentModel.update(
            { content },
            {
                where: {
                    [Op.and]: [
                        {
                            id: commentId
                        },
                        {
                            post_id: postId
                        }
                    ]
                }
            }
        );
        return response;
    } catch (error) {
        console.log(`[comment respository - updateComment] Error: ${error}`);
        throw Error(error);
    }
}

async function deleteComment(commentId, postId) {
    try {
        const response = await commentModel.destroy(
            {
                where: {
                    [Op.and]: [
                        {
                            id: commentId
                        },
                        {
                            post_id: postId
                        }
                    ]
                }
            }
        );
        return response;
    } catch (error) {
        console.log(`[comment respository - deleteComment] Error: ${error}`);
        throw Error(error);
    }
}

module.exports = {
    createComment,
    updateComment,
    deleteComment
}