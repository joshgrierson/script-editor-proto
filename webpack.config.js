const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: "#cheap-module-eval-source-map",
    resolve: {
        modules: ["node_modules", __dirname],
        extensions: ["*", ".js"]
    },
    devServer: {
        open: true,
        clientLogLevel: "error",
        hot: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new htmlWebpackPlugin({
        template: "./index.html",
        inject: "body",
        title: "Script Editor v1"
    })]
};