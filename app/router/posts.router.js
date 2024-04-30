const Router = require("koa-router")

const { pushPost, getPosts, getUserPosts,getPostInfo } = require('../controller/posts.controller')
const { auth } = require("../middleware/auth.middleware")
const router = new Router({
    prefix: '/posts'
})

// 简单的添加帖子请求
router.post('/pushPost', auth, pushPost)
// 简单的查询帖子请求
router.post('/getPosts', getPosts)
// 根据userId查询帖子请求
router.post('/getUserPosts', getUserPosts)
// 根据id查询帖子请求
router.post('/getPostInfo',getPostInfo)

module.exports = router;