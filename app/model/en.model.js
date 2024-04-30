const { DataTypes } = require('sequelize')

const seq = require('../db/db')

//创建use模型

const EnData = seq.define('EnData', {
    En: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        unique: true, // 是否唯一
        comment: '英语单词,不为空,且唯一'
    },
    EnCn: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        comment: '英语中译,不为空 存在多个意思'
    },
    enClass: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        defaultValue: 'n',
        comment: '单词类型 (adj形容词 adv副词 n名词 v动词)等 默认为n'
    },
    university: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // 是否为空
        comment: '是否是大学类单词 默认为true'
    },
    CTE4: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // 是否为空
        comment: '是否是CTE4类单词 默认为true'
    },
    CTE6: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // 是否为空
        comment: '是否是CTE6类单词 默认为true'
    },
    sentence:{
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        defaultValue: '该单词不存在例句',
        comment: '例句'
    },
    chineseTranslation:{
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        defaultValue: '该单词不存在例翻译',
        comment: '例句'
    }
},
)
EnData.sync({ force: false })
    .then(() => {
        console.log('en数据库表已创建或已存在');
        // 在这里可以开始处理其他逻辑
    })
    .catch((error) => {
        console.error('创建数据库表时出错：', error);
    });
/* EnData.sync({ force: true })  */
// 如果存在这张表，就强制删除 https://www.sequelize.cn/core-concepts/model-basics#%E6%A8%A1%E5%9E%8B%E5%90%8C%E6%AD%A5

module.exports = EnData