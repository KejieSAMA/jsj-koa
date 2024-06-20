const CommodityData = require('../model/shops.model')
const productOrders = require('../model/productOrders.model')
const axios = require('axios')
const seq = require('../db/db')

const { Sequelize, DataTypes } = require('sequelize');

class CommodityServer {
    async addCommodityInfo(Name, Info, Price, img_address, IP, brand, inventory, soldQuantity, state) {

        const res = await CommodityData.create({ Name, Info, Price, img_address, IP, brand, inventory, soldQuantity, state })

        return res.dataValues
    }

    async getCList() {
        const res = await CommodityData.findAll()

        return res
    }

    async getCInfoId(id) {
        const res = await CommodityData.findAll({
            where: {
                id: id
            }
        })
        return res
    }
    async dataBaseInventoryChanges(flag, num, id) {
        const commodity = await CommodityData.findByPk(id);
        if (commodity) {
            if (flag === 1) {
                await commodity.increment('soldQuantity', { by: num });
            } else if (flag === 0) {
                await commodity.decrement('soldQuantity', { by: num });
            }
        } else {
        }
    }
    async addUserOrders(productId, Name, Price, userId, num) {
        // 查询是否存在符合条件的订单
        var order = await productOrders.findOne({
            where: {
                productId: productId,
                userId: userId
            }
        });

        if (order) {
            // 如果存在订单，则更新订单的数量
            await productOrders.update({ num: order.num + num }, {
                where: {
                    productId: productId,
                    userId: userId
                }
            });
            console.log('Order updated successfully');
        } else {
            // 如果不存在订单，则创建新的订单
            await productOrders.create({
                productId: productId,
                Name: Name,
                Price: Price,
                userId: userId,
                num: num
            });
            console.log('New order created successfully');
        }

        order = await productOrders.findOne({
            where: {
                productId: productId,
                userId: userId
            }
        });
        return order;
    }
    async getUserOrderList(id){
        const res = await productOrders.findAll({
            where:{
                userId: id
            }
        })
        return res
    }
    async delUserOrder(userId,productId){
        console.log(userId,productId)
        const res = await productOrders.destroy({
            where: {
              userId: userId,
              productId: productId
            }
          })
        return res
    }
}

module.exports = new CommodityServer()