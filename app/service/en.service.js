const EnData = require('../model/en.model')
const UserWord = require('../model/userWord.model')
const axios = require('axios')
const seq = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize');

class EnDataServer {
    async addEn(En, EnCn, EnClass, university, CTE4, CTE6, sentence, chineseTranslation) {

        university = university != undefined ? university : true
        CTE4 = CTE4 != undefined ? CTE4 : true
        CTE6 = CTE6 != undefined ? CTE6 : true

        const URL = `http://dict.youdao.com/suggest?q=${En}&num=1&doctype=json`
        /* const resEn = await axios.get(URL);
        console.log(resEn) */
        const res = await EnData.create({ En, EnCn, EnClass, university, CTE4, CTE6, sentence, chineseTranslation })

        return res.dataValues
    }
    async getListAll() {

        const res = await EnData.findAll()

        return res
    }
    async getListAllClass(CTE4, CTE6, Univ) {

        const res = await EnData.findAll({
            where: {
                CTE4: CTE4,
                CTE6: CTE6,
                university: Univ
            }
        })

        return res
    }
    async getEnFromData(english) {
        const res = await EnData.findOne({
            where: {
                En: english
            }
        })
        return res ? res.dataValues : null
    }
    async getWords(userId) {
        const masteredWords = await UserWord.findAll({
            where: {
                userId: userId,
                mastered: true,
            },
            attributes: ['wordId'],
        });

        const wordIds = masteredWords.map((word) => word.wordId);

        if (wordIds != []) {
            const words = await EnData.findAll({
                where: {
                    id: {
                        [Sequelize.Op.notIn]: wordIds, // 排除已掌握单词的 wordId
                    },
                },
                order: Sequelize.literal('RAND()'), // 随机排序
                limit: 5, // 限制返回的记录数
            });
            return words

        } else {
            const words = await EnData.findAll({
                order: seq.random(), // 随机排序
                limit: 5, // 限制返回的记录数
            });
            return words
        }
    }
    async getMastered(userId) {
        const masteredWords = await UserWord.findAll({
            where: { userId, mastered: true } // 根据 userId 和 mastered 字段进行过滤
        });
        return masteredWords
    }
    async getMasteredLimit(userId) {
        const masteredWords = await UserWord.findAll({
            order: seq.random(),
            where: { userId, mastered: true },// 根据 userId 和 mastered 字段进行过滤
            limit: 5,
        });
        return masteredWords
    }
}

module.exports = new EnDataServer()