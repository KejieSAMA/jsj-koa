const Router = require("koa-router")

const { addCommodity, getCommodityList, getCommodityListId, inventoryChanges, addOrders, getOrderList,delOrder } = require("../controller/shop.controller")
const { auth } = require("../middleware/auth.middleware")
const router = new Router({
    prefix: '/commodity'
})

// 添加商品请求(单个)
router.post('/addCommodity', addCommodity)

// 获取商品信息s
router.post('/getCommodityList', getCommodityList)

// 根据id获取商品信息
router.post('/getCommodityId', getCommodityListId)

// 修改商品信息(库存的更改)
router.post('/inventoryChanges', inventoryChanges)

// 为特定用户添加订单
router.post('/addOrder', auth, addOrders)

// 查询某个用户的订单详情
router.post('/getUserOrderList', auth, getOrderList)
// 查询某个用户订单
router.post('/delUserOrder',delOrder)

router.post('/test', (ctx, next) => {
    ctx = 'success'
    console.log("==>/commodity/test")
})

module.exports = router;