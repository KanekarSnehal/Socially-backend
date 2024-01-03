const { post: postRepository } = require('../repository');
const { StatusCodes } = require('../utils/statusCodes')

async function getPost(req, res) {
    try {
        const { id } = req.params;
        const { userId } = req.query;

        if (!id || !userId) res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'postid or userid are available'
        });

        const post = id ? await postRepository.getPostById(id) : postRepository.getPostByUserId(userId);

        res.send({
            status: 'success',
            data: post
        });
    } catch (error) {
        console.log(`[post controller - getPostById] Error: ${error}`);
    }
}

async function getFollowingUsersPost(req, res) {
    try {
        const post = await postRepository.getFolllowingUsersPost();

        res.send({
            status: 'success',
            data: post
        });
    } catch (error) {
        console.log(`[post controller - getFolllowingUsersPost] Error: ${error}`);
    }
}

async function getExplorePost(req, res) {
    try {
        const post = await postRepository.getExplorePost();

        res.send({
            status: 'success',
            data: post
        });
    } catch (error) {
        console.log(`[post controller - getExplorePost] Error: ${error}`);
    }
}

async function createPost(req, res) {
    try {
        const { action, data } = req.body;
        if (!action || !data || action != 'create') return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'action/data is missing in request body'
        });

        await postRepository.createPost(data[0].description, 1);

        res.send({
            status: 'success',
            message: 'Post created successfully'
        });
    } catch (error) {
        console.log(`[post controller - createPost] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}

async function updatePost(req, res) {
    try {
        const { id } = req.params;
        const { action, data } = req.body;
        if (!id || action != 'update' || !data) return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'post id is invalid'
        });

        await postRepository.updatePost(data[0].description, id);

        res.send({
            status: 'success',
            message: 'Post updated successfully'
        });
    } catch (error) {
        console.log(`[post controller - updatePost] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}

async function deletePost(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'post id is invalid'
        });

        await postRepository.deletePost(id);

        res.send({
            status: 'success',
            message: 'Post deleted successfully'
        });
    } catch (error) {
        console.log(`[post controller - deletePost] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}

module.exports = {
    getPost,
    getFollowingUsersPost,
    getExplorePost,
    createPost,
    updatePost,
    deletePost
}