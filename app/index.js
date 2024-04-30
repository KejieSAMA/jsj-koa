const Koa = require('koa');
const { koaBody } = require('koa-body')
const cors = require('koa2-cors')

const errHandler = require('./errHandler')
const userLogin = require('./router/user.router')
const EnData = require('./router/en.router')
const Posts = require('./router/posts.router')
const LearnEnglish = require('./router/learn.router')
const {CORS_CONFIG } = require('../config/config.cors')

const app = new Koa();

app.use(
    cors(CORS_CONFIG)
)

app.use(koaBody())
app.use(userLogin.routes()).use(userLogin.allowedMethods())
app.use(EnData.routes()).use(EnData.allowedMethods())
app.use(LearnEnglish.routes()).use(LearnEnglish.allowedMethods())
app.use(Posts.routes()).use(Posts.allowedMethods())

app.on('error', errHandler)

module.exports = app
