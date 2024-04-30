const User = require('../model/use.model')

class UserServer {
    async createUser(user_name, nick_name, password) {

        const res = await User.create({ user_name, nick_name, password })

        return res.dataValues
    }
    async getUser(user_name) {
        const res = await User.findOne({
            where: {
                user_name: user_name
            }
        })

        return res ? res.dataValues : null
    }
    async upUserDate(id, Psd) {
        const res = User.update({ password: Psd }, {
            where: {
                id: id
            }
        })
        return res
    }
}

module.exports = new UserServer()