const { createUser, upUserDate, getUser } = require('../service/user.service')
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../../config/config.default')

const { userRegisterError } = require('../const/err.type')

class UserController {
    async register(ctx, next) {
        const { user_name, nick_name, password, } = ctx.request.body
        try {
            const res = await createUser(user_name, nick_name, password);
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            };
        } catch (error) {
            console.log(error)
            ctx.app.emit('error', userRegisterError, ctx)
        }
        console.log('running api => /users/register')
    }

    async login(ctx, next) {
        const { user_name } = ctx.request.body

        try {
            const res = await getUser(user_name)
            const { password, ...resUser } = res
            ctx.body = {
                code: 0,
                message: `用户登录成功`,
                result: {
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
                }
            }
        } catch (error) {
            console.error('用户登录失败', error)
        }
        console.log('running api => /users/login')
    }
    async changePsd(ctx, next) {
        const id = ctx.state.user.id
        const Psd = ctx.request.body.password
        try {
            const res = await upUserDate(id, Psd)
            ctx.body = {
                code: 0,
                message: '修改密码成功',
                result: {

                }
            }
        } catch (error) {
            console.log('密码修改失败', error)

        }
        console.log('running api => /users/cPsd')
    }
    async getUserInfo(ctx, next) {
        const { user_name } = ctx.request.body
        try {
            const res = await getUser(user_name)
            if (!(res ? 1 : 0)) {
                ctx.body = "null"
                return
            }
            ctx.body = res
        } catch (error) {

        }
        console.log('running api => users/getUserInfo')
    }
    async tokenGetUserInfo(ctx,next){
        ctx.body = ctx.state.user
        return;
    }
}

module.exports = new UserController()