const { post: postRepository } = require('../repository');
const { StatusCodes } = require('../utils/statusCodes')

async function getPost(req, res) {
    try {
        const { id } = req.params;
        const { userId } = req.query;

        if(!id || !userId) res.status(StatusCodes.BAD_REQUEST).json({
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

module.exports = {
    getPost,
    getFollowingUsersPost,
    getExplorePost,
}