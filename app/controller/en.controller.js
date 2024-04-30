const { addEn, getListAll, getEnFromData, getListAllClass, getWords, getMastered, getMasteredLimit } = require('../service/en.service')

class EnglishController {
    async addEnData(ctx, next) {
        const { english, englishCn, enClass, university, CTE4, CTE6, sentence, chineseTranslation } = ctx.request.body
        try {
            const res = await addEn(english, englishCn, enClass, university, CTE4, CTE6, sentence, chineseTranslation);
            ctx.body = {
                code: 0,
                message: '单词添加成功',
                result: {
                    id: res.id,
                    english: res.En
                }
            };
        } catch (error) {
            console.log(error)
        }
        console.log('running api => /enData/addEnData')
    }
    async addEnDataS(ctx, next) {
        const EnList = ctx.request.body
        let s = 0;
        let e = 0
        for (const EnData in EnList) {
            const { english, englishCn, enClass, university, CTE4, CTE6, sentence, chineseTranslation } = EnList[EnData]
            try {
                await addEn(english, englishCn, enClass, university, CTE4, CTE6, sentence, chineseTranslation);
                s++;
            } catch (error) {
                e++;
                console.log(error)
            }
            console.log('running api => /enData/addEnDatas')
        }
        ctx.body = {
            code: 0,
            message: '多个单词添加成功',
            result: {
                count: s,
                error: e
            }
        };
        console.log(ctx.body)
    }
    async getList(ctx, next) {
        const res = await getListAll()
        var resArr = []
        for (const index in res) {
            resArr.push(res[index].dataValues)
        }
        ctx.body = {
            code: 200,
            message: `查询单词成功,共${resArr.length}个`,
            result: resArr
        }
    }
    async getListClass(ctx, next) {
        const { CTE4, CTE6, university } = ctx.request.body
        const res = await getListAllClass(CTE4, CTE6, university)
        var resArr = []
        for (const index in res) {
            resArr.push(res[index].dataValues)
        }
        ctx.body = {
            code: 200,
            message: `查询单词成功,共${resArr.length}个`,
            result: resArr
        }
    }
    async getEnData(ctx, next) {
        const { english } = ctx.request.body
        if (!english) {
            
            ctx.body = {
                message: "查询单词为空"
            }
            return
        }
        const res = await getEnFromData(english)
        if (res == null) {
            ctx.body = {
                code: 500,
                message: '您所查询的单词在数据库中不存在'
            }
            return
        }
        ctx.body = {
            code: 200,
            message: '单词查询成功',
            result: res
        }
    }
    async getWord(ctx, next) {
        const { id } = ctx.state.user
        const res = await getWords(id)
        ctx.body = {
            userId: id,
            code: 400,
            message: res
        }
    }
    async getMasteredWords(ctx, next) {
        const { id } = ctx.state.user
        const res = await getMastered(id)
        ctx.body = {
            message: res
        }
    }
    async getMasteredWordsLimit(ctx, next) {
        const { id } = ctx.state.user
        const res = await getMasteredLimit(id)
        ctx.body = {
            message: res
        }
    }
}

module.exports = new EnglishController()