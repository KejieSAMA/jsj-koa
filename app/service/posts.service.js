const Posts = require("../model/posts.model")

class PostsServer {
    // 根据id获取帖子信息
    async getPostInfo({id}){
        // 从Posts表中查找id为id的记录
        const res = await Posts.findAll({
            where:{
                id: id
            }
        })
        return res
    }
    // 添加帖子
    async addPost({ userId, postClass, postName, postContent, user_comment }) {
        // 向Posts表中插入一条记录
        const res = await Posts.create({ userId, postClass, postName, postContent, user_comment })
        return res.dataValues
    }
    // 获取帖子列表
    async getPost() {
        // 从Posts表中查找所有记录，限制返回结果的数量为五个，按照createdAt字段进行降序排序
        const res = await Posts.findAll({
            limit: 5, // 限制返回结果的数量为五个
            order: [['createdAt', 'DESC']] // 按照 createdAt 字段进行降序排序
        })
        return res
    }
    // 根据用户id获取用户帖子列表
    async getUserPost({ userId }) {
        // 从Posts表中查找userId为userId的记录
        const res = await Posts.findAll({
            where: {
                userId: userId
            }
        })
        return res
    }

}

module.exports = new PostsServer()