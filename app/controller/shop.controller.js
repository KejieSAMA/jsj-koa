
const { addCommodityInfo, getCList,getCInfoId,dataBaseInventoryChanges,addUserOrders,getUserOrderList, delUserOrder } = require("../service/shop.service")

class CommodityController {
    async addCommodity(ctx, next) {
        const { Name, Info, Price, img_address, IP, brand, inventory, soldQuantity, state } = ctx.request.body
        try {
            const res = await addCommodityInfo(Name, Info, Price, img_address, IP, brand, inventory, soldQuantity, state);
            ctx.body = {
                code: 0,
                message: '商品添加成功',
                result: {
                    id: res.id,
                    name: res.Name
                }
            };
        } catch (error) {
            console.log(error)
        }
        console.log('running api => /commodity/addCommodity')
    }
    async getCommodityList(ctx, next) {
        try {
            const res = await getCList();
            ctx.body = {
                code: 0,
                message: '商品信息获取成功',
                result: res
            };
        } catch (error) {
            console.log(error)
        }
        console.log('running api => /commodity/getCommodityList')
    }
    async getCommodityListId(ctx, next) {
        const { id } = ctx.request.body
        try {
            const res = await getCInfoId(id);
            ctx.body = {
                code: 0,
                message: '商品信息获取成功',
                result: res
            };
        } catch (error) {
            console.log(error)
        }
        console.log('running api => /commodity/getCommodityId')
    }
    async inventoryChanges(ctx,next){
        const { flag , num , id } = ctx.request.body
        // flag = 1 代表出售数量增加 flag = 0出售数量减少
        try{
            await dataBaseInventoryChanges(flag , num , id)
            const res = await getCInfoId(id);
            ctx.body = {
                code: 0,
                message: '商品信息修改成功',
                result: res
            };

        } catch(error){

            console.log(error)
        }
        console.log('running api => /commodity/inventoryChanges')

    }
    async addOrders(ctx,next){
        const {id} = ctx.state.user
        const {productId,Name,Price,num} = ctx.request.body
        try {
            const res = await addUserOrders(productId,Name,Price,id,num)
            
            ctx.body = {
                code: 0,
                message: '订单添加成功',
                result: res
            };
        } catch (error) {
            
            console.log(error)
        }
        console.log('running api => /commodity/getOrderList')
    }
    async getOrderList(ctx,next){
        const {id} = ctx.state.user
        try {
            const res = await getUserOrderList(id)
            ctx.body = {
                code: 0,
                message: '用户订单详情获取成功',
                result: res
            };
        } catch (error) {
            
            console.log(error)
        }
        console.log('running api => /commodity/getOrderList')
    }
    async delOrder(ctx,next){
        const { userId , productId } = ctx.request.body
        try {
            const res = await delUserOrder(userId,productId)
            ctx.body = {
                code: 0,
                message: '用户订单删除成功',
                result: res
            };
        } catch (error) {
            console.log(error)
        }
        console.log('running api => /commodity/delUserOrder')
    }
}

module.exports = new CommodityController()