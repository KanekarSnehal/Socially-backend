const { bookmark: bookmarkRepository } = require('../repository');
const { StatusCodes } = require('../utils/statusCodes');

async function createBookmark(req, res) {
    const { user_id } = req.user;
    try {
        const { postId } = req.params;
        if (!postId) return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'postId is missing/invalid in request body'
        });

        await bookmarkRepository.createBookmark(postId, user_id);

        res.send({
            status: 'success',
            message: 'bookmarked post successfully'
        });
    } catch (error) {
        console.log(`[bookmark controller - createBookmark] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}

async function deleteBookmark(req, res) {
    try {
        const { postId } = req.params;
        const { user_id } = req.user;

        if (!postId) return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'postId is missing/invalid in request body'
        });

        await bookmarkRepository.deleteBookmark(postId, user_id);

        res.send({
            status: 'success',
            message: 'unbookmarked post successfully'
        });
    } catch (error) {
        console.log(`[bookmark controller - deleteBookmark] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}

module.exports = {
    createBookmark,
    deleteBookmark
}