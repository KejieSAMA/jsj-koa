const Router = require("koa-router")

const { userValidator, verifyUser, cryptPsd, verifyLogin, verifyChangePsd } = require('../middleware/user.middleware')
const { register, login, changePsd, getUserInfo,tokenGetUserInfo } = require('../controller/user.controller')
const { auth } = require("../middleware/auth.middleware")

const router = new Router({
    prefix: '/users'
})

// 注册请求
router.post('/register', userValidator, verifyUser, cryptPsd, register)
// 登录请求
router.post('/login', userValidator, verifyLogin, login)
// 修改密码
router.patch('/cPsd', auth, cryptPsd, verifyChangePsd, changePsd)
// 查询用户信息
router.post('/getUserInfo', getUserInfo)
// 根据token查询用户信息
router.post('/tokenGetUserInfo',auth,tokenGetUserInfo)


module.exports = router;