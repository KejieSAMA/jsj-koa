const { addPost, getPost, getUserPost,getPostInfo } = require('../service/posts.service')

class PostsController {
    async getPostInfo(ctx, next) {
        const { id } = ctx.request.body
        try {
            const res = await getPostInfo({ id })
            ctx.body = {
                code: 0,
                message: '帖子信息查询增加成功',
                result: res
            }
        } catch (error) {
            console.log(error)
        }
        console.log('running api => /posts/getPostInfo')
    }
    async pushPost(ctx, next) {
        const { postName, postClass, postContent, user_comment } = ctx.request.body
        const userId = ctx.state.user.id
        try {
            const res = await addPost({ userId, postClass, postName, postContent, user_comment });
            ctx.body = {
                code: 0,
                message: '帖子增加成功',
                result: {
                    id: res.id,
                    post_name: res.postName
                }
            };
        } catch (error) {
            console.log(error)
        }
        console.log('running api => /posts/pushPost')
    }
    async getPosts(ctx, next) {
        try {
            const res = await getPost()
            ctx.body = {
                code: 0,
                message: '获取帖子成功',
                result: res
            };
        } catch (error) {
            console.log(error)
        }
        console.log('running api => /posts/getPosts')
    }
    async getUserPosts(ctx, next) {
        const { userId } = ctx.request.body
        console.log(userId)
        try {
            const res = await getUserPost({ userId })
            console.log(res)
            ctx.body = {
                code: 0,
                message: '获取帖子成功',
                result: res
            };
        } catch (error) {
            console.log(error)
        }
        console.log('running api => /posts/getPosts')
    }
}


module.exports = new PostsController()