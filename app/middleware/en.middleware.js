const addEnData = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    console.log("addEnData-success")
    await next()
}

module.exports = {
    addEnData
}