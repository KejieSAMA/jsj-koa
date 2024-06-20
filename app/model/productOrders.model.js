const { DataTypes } = require('sequelize')

const seq = require('../db/db')

//创建productOrders模型

const productOrders = seq.define('productOrders', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false, // 是否为空
        defaultValue: 0,
        comment: '商品id'
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        defaultValue: "这里是商品名字",
        comment: '商品名字'
    },
    Price: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        defaultValue: '99',
        comment: '商品价格,默认99'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false, // 是否为空
        defaultValue: 0,
        comment: '用户id'
    },
    num: {
        type: DataTypes.INTEGER,
        allowNull: false, // 是否为空
        defaultValue: 0,
        comment: 'id为userId的用户,购买该商品的数量'
    },
},
)
productOrders.sync({ force: false })
    .then(() => {
        console.log('productOrders数据库表已创建或已存在');
        // 在这里可以开始处理其他逻辑
    })
    .catch((error) => {
        console.error('创建数据库表时出错：', error);
    });
/* EnData.sync({ force: true })  */
// 如果存在这张表，就强制删除 https://www.sequelize.cn/core-concepts/model-basics#%E6%A8%A1%E5%9E%8B%E5%90%8C%E6%AD%A5

module.exports = productOrders