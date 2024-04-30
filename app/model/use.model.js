const { DataTypes } = require('sequelize')

const seq = require('../db/db')

//创建use模型

const User = seq.define('User', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        unique: true, // 是否唯一
        comment: '用户名登录账号 不为空且唯一'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '不为空'
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员,默认为否'
    },
    nick_name: {
        type: DataTypes.STRING,
        defaultValue: '校英智学用户',
        unique: false, // 是否唯一
        comment: '用户昵称 不唯一'
    },
    user_avatar_address: {
        type: DataTypes.STRING,
        defaultValue: 'null',
        unique: false, // 是否唯一
        comment: '用户头像 不唯一'
    },
    user_grade: {
        type: DataTypes.STRING,
        defaultValue: '未填写',
        unique: false, // 是否唯一
        comment: '用户年级 不唯一'
    },
    user_school: {
        type: DataTypes.STRING,
        defaultValue: '未填写',
        unique: false, // 是否唯一
        comment: '用户学校 不唯一'
    },
    user_age: {
        type: DataTypes.STRING,
        defaultValue: '未填写',
        unique: false, // 是否唯一
        comment: '用户年龄 不唯一'
    }
},
)
User.sync({ force: false })
    .then(() => {
        console.log('use数据库表已创建或已存在');
        // 在这里可以开始处理其他逻辑
    })
    .catch((error) => {
        console.error('创建数据库表时出错：', error);
    });
/* User.sync({ force: true })  */
// 如果存在这张表，就强制删除 https://www.sequelize.cn/core-concepts/model-basics#%E6%A8%A1%E5%9E%8B%E5%90%8C%E6%AD%A5

module.exports = User