const Router = require("koa-router")

const { addEnData, addEnDataS, getList, getEnData, getListClass, getWord, getMasteredWords, getMasteredWordsLimit } = require('../controller/en.controller')
const { auth } = require("../middleware/auth.middleware")

const router = new Router({
    prefix: '/enData'
})

// 添加单词请求(单个)
router.post('/addEnData', addEnData)
// 添加单词请求(多个)
router.post('/addEnDatas', addEnDataS)
// 全量单词获取
router.post('/getList', getList)
// 特定单词获取
router.post('/getEnData', getEnData)
// 类全量单词获取
router.post('/getListClass', getListClass)
// 随机抽取几个单词 不包括已掌握的单词
router.post('/getWord', auth, getWord)
// 查询已掌握的单词 无限制
router.post('/getWordMastered', auth, getMasteredWords)
// 查询已掌握的单词 限制
router.post('/getWordMasteredLimit', auth, getMasteredWordsLimit)
// 删除单词请求(单个)
router.post('/deleteEnData', (ctx, next) => {
    ctx = 'success'
})
// 修改单词请求(单个)
router.post('/changeEnData', (ctx, next) => {
    ctx = 'success'
})


module.exports = router;