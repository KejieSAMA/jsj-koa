const { DataTypes } = require('sequelize')

const seq = require('../db/db')

//创建Shop模型

const CommodityData = seq.define('CommodityData', {
    Name: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        defaultValue: "这里是商品名字",
        comment: '商品名字'
    },
    Info: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        defaultValue: "这里是商品信息",
        comment: '商品简介'
    },
    Price: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        defaultValue: '99',
        comment: '商品价格,默认99'
    },
    img_address: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        defaultValue: '???',
        comment: '商品Img地址'
    },
    IP: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        defaultValue: "Kejie",
        comment: '商品所属IP方'
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false, // 是否为空
        defaultValue: "这里是商品名字",
        comment: '商品所属品牌方'
    },
    inventory: {
        type: DataTypes.INTEGER,
        allowNull: false, // 是否为空
        defaultValue: 9999999,
        comment: '商品库存,默认9999999个'
    },
    soldQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false, // 是否为空
        defaultValue: 0,
        comment: '商品销售数量,默认为0个'
    },
    state: {
        type: DataTypes.INTEGER,
        allowNull: false, // 是否为空
        defaultValue: 1,
        comment: '销售状态,为1则销售中,为0则处于未销售状态'
    },
},
)
CommodityData.sync({ force: false })
    .then(() => {
        console.log('CommodityDatas数据库表已创建或已存在');
        // 在这里可以开始处理其他逻辑
    })
    .catch((error) => {
        console.error('创建数据库表时出错：', error);
    });
/* EnData.sync({ force: true })  */
// 如果存在这张表，就强制删除 https://www.sequelize.cn/core-concepts/model-basics#%E6%A8%A1%E5%9E%8B%E5%90%8C%E6%AD%A5

module.exports = CommodityData