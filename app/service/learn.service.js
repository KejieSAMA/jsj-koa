const UserWord = require('../model/userWord.model.js')
const { Sequelize, DataTypes } = require('sequelize');
const EnData = require('../model/en.model')
class LearnServer {
    async getUserLearned(userId){
        const res = await UserWord.count({
            where: {
                userId: userId
            }
        })
        return res;
    }
    async upUserWordDate(userId, wordId, word) {
        const res = await UserWord.findOrCreate({
            where: { wordId, userId }, // 根据 wordId 和 userId 进行查找或创建
            defaults: { mastered: true, word } // 默认设置 mastered 字段为 true，表示用户掌握了该单词
        });
        return res

    }
    async getWordInfo(word) {
        const res = await EnData.findAll({
            where: {
                en: word
            }
        })
        return res;
    }
    async getOtherWordInfo(word) {
        const randomWords = await EnData.findAll({
            where: {
                en: {
                    [Sequelize.Op.not]: 'word'
                }
            },
            order: Sequelize.literal('RAND()'),
            limit: 3
        });
        return randomWords;
    }
    async upUserWordDateFalse(userId, wordId) {
        const res = await UserWord.update(
            { mastered: false },
            { where: { wordId, userId } }, // 根据 wordId 和 userId 进行查找或创建
            // 默认设置 mastered 字段为 false，表示用户未掌握该单词
        );
        return res
    }
}

module.exports = new LearnServer()