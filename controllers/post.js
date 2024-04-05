const { post: postRepository, like: likeRepository, bookmark: bookmarkRepository, user: userRepository } = require('../repository');
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
        const { user_id } = req.user;
        const followingUsers = await userRepository.getFollowingUsers(user_id);
        const post = await postRepository.getFolllowingUsersPost(followingUsers.map(u => u.following_user));
        const postIds = post.map(p => p.id);
        const likesData = await likeRepository.getLikesByPostId(postIds, user_id);
        const bookmarkData = await bookmarkRepository.getBookmarksByPostId(postIds, user_id);
        post.forEach(p => {
            if (likesData.some(ld => ld.post_id == p.id)) {
                p.setDataValue('is_liked', true);
            }
            else
                p.setDataValue('is_liked', false);

            if (bookmarkData.some(bd => bd.post_id == p.id)) {
                p.setDataValue('is_bookmarked', true);
            }
            else
                p.setDataValue('is_bookmarked', false);
        });

        res.send({
            status: 'success',
            data: post
        });
    } catch (error) {
        console.log(`[post controller - getFolllowingUsersPost] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        });
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
        const { user_id } = req.user;
        if (!action || !data || action != 'create') return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'action/data is missing in request body'
        });

        await postRepository.createPost(data[0].description, user_id);

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

async function getPostByUserName(req, res) {
    try {
        const { user_name } = req.params;
        const { user_id } = req.user;
        if (!user_name) return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: 'user_name is invalid'
        });

        const post = await postRepository.getPostByUserName(user_name);
        const postIds = post.map(p => p.id);
        const likesData = await likeRepository.getLikesByPostId(postIds, user_id);
        const bookmarkData = await bookmarkRepository.getBookmarksByPostId(postIds, user_id);
        post.forEach(p => {
            if (likesData.some(ld => ld.post_id == p.id)) {
                p.setDataValue('is_liked', true);
            }
            else
                p.setDataValue('is_liked', false);

            if (bookmarkData.some(bd => bd.post_id == p.id)) {
                p.setDataValue('is_bookmarked', true);
            }
            else
                p.setDataValue('is_bookmarked', false);
        });


        res.send({
            status: 'success',
            data: post
        });
    } catch (error) {
        console.log(`[post controller - getPostByUserName] Error: ${error}`);
        res.status(StatusCodes.BAD_REQUEST).json({
            status: 'failure',
            message: error.message
        })
    }
}

async function getBookmarkedPosts(req, res) {
    try {
        const { user_id } = req.user;
        const bookmarkedPosts = await postRepository.getBookmarkedPosts(user_id);
        const postIds = bookmarkedPosts.map(p => p.post_id);
        const likesData = await likeRepository.getLikesByPostId(postIds, user_id);

        res.send({
            status: 'success',
            data: bookmarkedPosts.map(p => {
                const post = p.post;
                post.setDataValue('is_bookmarked', true);
                if (likesData.some(ld => ld.post_id == post.id)) {
                    post.setDataValue('is_liked', true);
                }
                else
                    post.setDataValue('is_liked', false);
                return post;
            })
        });
    } catch (error) {
        console.log(`[post controller - getBookmarkedPosts] Error: ${error}`);
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
    deletePost,
    getPostByUserName,
    getBookmarkedPosts
}