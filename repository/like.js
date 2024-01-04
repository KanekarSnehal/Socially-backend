const { Op, where } = require('sequelize');
const { like: likeModel } = require('../models');

async function createLike(post_id, created_by) {
    try {
        const response = await likeModel.create(
            {
                post_id,
                created_by
            }
        );
        return response;
    } catch (error) {
        console.log(`[like respository - createLike] Error: ${error}`);
        throw Error(error);
    }
}

async function deleteLike(postId, likedBy) {
    try {
        const response = await likeModel.destroy(
            {
                where: {
                    [Op.and]: [
                        {
                            post_id: postId
                        },
                        {
                            created_by: likedBy
                        }

                    ]
                }
            }
        );
        return response;
    } catch (error) {
        console.log(`[like respository - deleteLike] Error: ${error}`);
        throw Error(error);
    }
}

async function getLikesByPostId(postIds) {
    try {
        const response = await likeModel.findAll({
            where: {
                post_id: postIds
            },
            attributes: ['post_id', 'created_by']
        });
        return response;
    } catch (error) {
        console.log(`[like respository - getLikesByPostId] Error: ${error}`);
        throw Error(error);
    }
}

module.exports = {
    createLike,
    getLikesByPostId,
    deleteLike
}