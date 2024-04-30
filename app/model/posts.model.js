const { DataTypes } = require('sequelize')

const seq = require('../db/db')

//创建Posts模型

const Posts = seq.define('Posts', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        unique: false, // 是否唯一
        comment: '发表主题用户ID'
    },
    postName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false, // 是否唯一
        comment: '主题标题'
    },
    postContent: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false, // 是否唯一
        comment: '主题内容'
    },
    postClass:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '讨论',
        unique: false, // 是否唯一
        comment: '类型'
    },
    user_comment: {
        type: DataTypes.TEXT,
        defaultValue: '[]',
        unique: false, // 是否唯一
        comment: '存储用户评论数据'
    },
    view_number: {
        type: DataTypes.STRING,
        defaultValue: "0",
        comment: '存储帖子查看次数'
    },
    replies_number: {
        type: DataTypes.STRING,
        defaultValue: "0",
        comment: '存储帖子回复次数'
    },
},
)
Posts.sync({ force: false })
    .then(() => {
        console.log('post数据库表已创建或已存在');
        // 在这里可以开始处理其他逻辑
    })
    .catch((error) => {
        console.error('创建数据库表时出错：', error);
    });
/* Posts.sync({ force: true }) */ 
// 如果存在这张表，就强制删除 https://www.sequelize.cn/core-concepts/model-basics#%E6%A8%A1%E5%9E%8B%E5%90%8C%E6%AD%A5

module.exports = Posts