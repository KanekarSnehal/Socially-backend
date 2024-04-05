const { Op, where } = require('sequelize');
const { bookmark: bookmarkModel } = require('../models');

async function createBookmark(post_id, created_by) {
    try {
        const response = await bookmarkModel.create(
            {
                post_id,
                created_by
            }
        );
        return response;
    } catch (error) {
        console.log(`[bookmark respository - createBookmark] Error: ${error}`);
        throw Error(error);
    }
}

async function deleteBookmark(postId, bookMarkeddBy) {
    try {
        const response = await bookmarkModel.destroy(
            {
                where: {
                    [Op.and]: [
                        {
                            post_id: postId
                        },
                        {
                            created_by: bookMarkeddBy
                        }

                    ]
                }
            }
        );
        return response;
    } catch (error) {
        console.log(`[bookmark respository - deleteBookmark] Error: ${error}`);
        throw Error(error);
    }
}

async function getBookmarksByPostId(postIds, userId) {
    try {
        const userIds = Array.isArray(userId) ? userId : [userId];
        const response = await bookmarkModel.findAll({
            where: {
                [Op.and]: [
                    { post_id: postIds },
                    { created_by: userIds }
                ]
            },
            attributes: ['post_id', 'created_by']
        });
        return response;
    } catch (error) {
        console.log(`[bookmark respository - getBookmarksByPostId] Error: ${error}`);
        throw Error(error);
    }
}

module.exports = {
    createBookmark,
    getBookmarksByPostId,
    deleteBookmark
}