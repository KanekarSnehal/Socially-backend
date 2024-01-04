const { like: likeRepository } = require('../repository');
const { StatusCodes } = require('../utils/statusCodes');

async function createLike(req, res) {
    const { user_id } = req.user;
    try {
        const { postId } = req.params;
        if (!postId) return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'postId is missing/invalid in request body'
        });

        await likeRepository.createLike(postId, user_id);

        res.send({
            status: 'success',
            message: 'Like post successfully'
        });
    } catch (error) {
        console.log(`[like controller - createLike] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}

async function deleteLike(req, res) {
    const { user_id } = req.user;
    try {
        const { postId } = req.params;
        if (!postId) return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'postId is missing/invalid in request body'
        });

        await likeRepository.deleteLike(postId, user_id);

        res.send({
            status: 'success',
            message: 'Like deleted successfully'
        });
    } catch (error) {
        console.log(`[like controller - createLike] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}

module.exports = {
    createLike,
    deleteLike
}