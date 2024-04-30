const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../../config/config.default')

const { tokenExpiredError, JsonWebTokenError } = require('../const/err.type')

const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    ctx.request.token = token
    try {
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError': {
                console.error('token已过期', error)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            }
            case 'JsonWebTokenError': {
                console.error('token无效', error)
                return ctx.app.emit('error', JsonWebTokenError, ctx)
            }
        }
    }
    await next()
}

module.exports = {
    auth
}