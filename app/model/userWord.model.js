const { DataTypes } = require('sequelize')

const seq = require('../db/db')

const UserWord = seq.define('UserWord', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户ID。它被定义为不允许为空'
    },
    wordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '英语单词ID。它被定义为不允许为空'
    },
    word: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '英语单词。它被定义为不允许为空'
    },
    mastered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '表示用户是否已经掌握了该单词。它被定义为不允许为空，默认值为 false'
    },
},
)

UserWord.sync({ force: false })
    .then(() => {
        console.log('userWord数据库表已创建或已存在');
        // 在这里可以开始处理其他逻辑
    })
    .catch((error) => {
        console.error('创建数据库表时出错：', error);
    });
 /*    UserWord.sync({ force: true })  */
// 如果存在这张表，就强制删除 https://www.sequelize.cn/core-concepts/model-basics#%E6%A8%A1%E5%9E%8B%E5%90%8C%E6%AD%A5

module.exports = UserWord