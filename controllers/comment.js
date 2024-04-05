const { comment: commentRepository, post: postRepository } = require('../repository');
const { StatusCodes } = require('../utils/statusCodes');

async function createComment(req, res) {
    const { user_id } = req.user;
    try {
        const { postId } = req.params;
        const { action, data } = req.body;
        if (!postId || !action || !data || action != 'create') return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'action/data/postId is missing/invalid in request body'
        });

        await commentRepository.createComment(data[0].content, postId, user_id);

        // get post by id
        const post = await postRepository.getPostById(postId);

        post.setDataValue('comment_count', post.comment_count + 1);
        await post.save();


        res.send({
            status: 'success',
            message: 'Comment created successfully'
        });
    } catch (error) {
        console.log(`[comment controller - createComment] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}

async function updateComment(req, res) {
    try {
        const { postId, commentId } = req.params;
        const { action, data } = req.body;
        if (!postId || !commentId) return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'action/data/postId/commentId is missing/invalid in request body'
        });

        action == 'update' ? await commentRepository.updateComment(data[0].content, commentId, postId) : await commentRepository.deleteComment(commentId, postId);

        if(action != 'update') {
            // get post by id
            const post = await postRepository.getPostById(postId);

            post.setDataValue('comment_count', post.comment_count - 1);
            await post.save();
        }

        res.send({
            status: 'success',
            message: `Comment ${action == 'update' ? 'updated' : 'deleted'} successfully`
        });
    } catch (error) {
        console.log(`[comment controller - updateComment] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}
module.exports = {
    createComment,
    updateComment
}