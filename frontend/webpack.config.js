const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    // resolve: {
    //     fallback: {
    //         "fs": false,
    //         "tls": false,
    //         "net": false,
    //         "path": false,
    //         "zlib": false,
    //         "http": false,
    //         "https": false,
    //         "stream": false,
    //         "crypto": false,
    //         "url": require.resolve("url/"),
    //         "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
    //     } 
    // },
    target: 'node',
    // plugins: [
	// 	new NodePolyfillPlugin()
	// ]
}