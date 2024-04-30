const Router = require("koa-router")

const { query, translate, userLean,userNoLearn,userLearned } = require('../controller/learn.controller')

const router = new Router({
    prefix: '/learn'
})

// 简单查询单词请求
router.post('/query',query)
// 长句子翻译请求
router.post('/translate',translate)
// 用户确认学习
router.post('/userLean',userLean)
// 用户训练失败，单词标注未掌握
router.post('/userNoLearn',userNoLearn)
// 查询某个用户一共学习了多少个单词
router.post('/userLearned',userLearned)


module.exports = router;