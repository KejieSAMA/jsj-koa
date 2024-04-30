const bcrypt = require('bcryptjs')

const { getUser } = require('../service/user.service')
const { userFormateError, userAlreadyExited, userNoExited, userLoginError, userPsdError } = require('../const/err.type')

const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    console.log("userValidator-success")
    if (!user_name || !password) {
        console.error('密码或用户名为空', ctx.request.body)
        /* ctx.app.emit('error', userFormateError, ctx) */
        ctx.body = userFormateError
        return
    }
    await next()
}

const verifyUser = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    if (await getUser(user_name)) {
        console.error('用户名已存在', ctx.request.body)
        ctx.body = userAlreadyExited /* ctx.app.emit('error', userAlreadyExited, ctx) */
        return
    }
    await next()
}

const cryptPsd = async (ctx, next) => {
    const { password } = ctx.request.body

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash
    await next()
}

const verifyLogin = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    console.log("verifyLogin-success")
    try {
        const res = await getUser(user_name)
        if (!res) {
            console.error('用户名不存在', ctx.request.body)
            return ctx.body = userNoExited /* ctx.app.emit('error', userNoExited, ctx) */
        }
        if (!bcrypt.compareSync(password, res.password)) {
            return ctx.body = userPsdError /* ctx.app.emit('error', userPsdError, ctx) */
        }
    } catch (error) {
        console.log(error)
        return ctx.body = userLoginError /* ctx.app.emit('error', userLoginError, ctx) */
    }

    await next()
}

const verifyChangePsd = async (ctx, next) => {
    const { oldPassword } = ctx.request.body
    if (!bcrypt.compareSync(oldPassword, ctx.state.user.password)) {
        return  ctx.body =  userPsdError/* ctx.app.emit('error', userPsdError, ctx) */
    }

    await next()
}

module.exports = {
    userValidator,
    verifyUser,
    cryptPsd,
    verifyLogin,
    verifyChangePsd
}