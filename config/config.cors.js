const CORS_CONFIG = {
    origin: () => 'http://localhost:8080',
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    exposeHeaders: ["Authorization"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"]
}

module.exports = {
    CORS_CONFIG
}