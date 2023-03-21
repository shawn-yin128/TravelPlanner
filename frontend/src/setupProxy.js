const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/backend",
        createProxyMiddleware({
            target: "http://localhost:8080/",
            changeOrigin: true,
            pathRewrite: {
                '^/backend': ''
            }
        })
    );
};

