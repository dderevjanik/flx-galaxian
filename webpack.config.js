const webpack = require("webpack");

module.exports = {
    output: {
        path: __dirname + "/dist",
        filename: "app.js",
        library: "fluxga",
        libraryTarget: "this"
    },
    module: {
        loaders: [
            {
                test: /\.js$/, 
                exclude: /(node_modules|dist)/, 
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    }
}
