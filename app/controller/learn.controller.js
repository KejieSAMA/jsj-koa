const axios = require('axios')
const md5 = require('md5')
const { upUserWordDate,upUserWordDateFalse,getWordInfo,getOtherWordInfo,getUserLearned } = require('../service/learn.service')

class LearnController {
    async userLearned(ctx,next){
        const { userId } = ctx.request.body
        const res = await getUserLearned(userId)
        ctx.body = {
            result: {
                count: res
            }
        }
    }
    async query(ctx, next) {
        const { q, num } = ctx.request.body
        if (!q) {
            ctx.body = {
                result: {
                    message: '查询为空'
                }
            }
            return
        }
        const queryUrl = `http://dict.youdao.com/suggest?q=${q}&num=${num}&doctype=json`
        const res = await axios.get(queryUrl)
        const dataRes = await getWordInfo(q);
        const otherWordRes =  await getOtherWordInfo(q);
        ctx.body = {
            result: res.result,
            enData: res.data,
            dataRes: dataRes,
            otherWordRes: otherWordRes
        }
    }
    async translate(ctx, next) {
        const { q, to } = ctx.request.body
        if (!q || !to) {
            ctx.body = {
                result: {
                    message: '查询为空或翻译对象为空'
                }
            }
            return
        }
        const APP_ID = 20231218001913584
        const Key = '4YuMmPONmZL84D_v3HwJ'
        const salt = Math.random() * 100000 + 1000000
        const sign = md5(APP_ID + q + salt + Key)
        const URL = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${q}&from=auto&to=${to}&appid=${APP_ID}&salt=${salt}&sign=${sign}`
        const res = await axios.get(URL)
        ctx.body = res.data
    }
    async userLean(ctx, next) {
        const { userId, wordId, word } = ctx.request.body
        const res = await upUserWordDate(userId, wordId, word)
        ctx.body = {
            message: '成功学习当前单词'
        }
        return res
    }
    async userNoLearn(ctx, next) {
        const { userId, wordId, word } = ctx.request.body
        await upUserWordDateFalse(userId, wordId, word)
        ctx.body = {
            message: '当前单词成功标注未掌握'
        }
    }
}

module.exports = new LearnController()