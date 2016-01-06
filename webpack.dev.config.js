const webpack = require("webpack"),
    path = require("path");

module.exports = {
    cache: true,
    debug: true,
    devtools: "eval",
    entry: {
        app: ["./src/app.js"]
    },
    output: {
        path: path.resolve(__dirname, "./dist/"),
        publicPath: "./dist/",
        filename: "app.js",
    },
    module: {
        loaders: [
            {
                test: /\.json$/, 
                exclude: /(node_modules|dist)/, 
                loader: 'json'
            },
            {
                test: /\.js$/, 
                exclude: /(node_modules|dist)/, 
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.json']
    }
}
