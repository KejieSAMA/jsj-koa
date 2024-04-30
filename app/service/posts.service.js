const Posts = require("../model/posts.model")

class PostsServer {
    async getPostInfo({id}){
        const res = await Posts.findAll({
            where:{
                id: id
            }
        })
        return res
    }
    async addPost({ userId, postClass, postName, postContent, user_comment }) {
        const res = await Posts.create({ userId, postClass, postName, postContent, user_comment })
        return res.dataValues
    }
    async getPost() {
        const res = await Posts.findAll({
            limit: 5, // 限制返回结果的数量为五个
            order: [['createdAt', 'DESC']] // 按照 createdAt 字段进行降序排序
        })
        return res
    }
    async getUserPost({ userId }) {
        const res = await Posts.findAll({
            where: {
                userId: userId
            }
        })
        return res
    }

}

module.exports = new PostsServer()