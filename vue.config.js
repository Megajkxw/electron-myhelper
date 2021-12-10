// // module.exports={
// //     pluginOptions: {
// //         electronBuilder: {
// //             nodeIntegration: true
// //         }
// //     },
// // }
// module.exports = {
//     devServer: {
//         proxy: {
//             '/api': {
//                 // 此处的写法，我访问的是http://localhost:8080/api/dataHome.json设置代理后，axios请求不需要把域名带上，只需要把路径前面加上 /api 即可。
//                 target: 'http://localhost:8089/api/',
//                 // 允许跨域
//                 changeOrigin: true,
//                 ws: true,
//                 pathRewrite: {
//                     '^/api': ''
//                 }
//             }
//         }
//     }
// }
// module.exports = {
//     proxyTable: {
//         '/apis': {
//             target: 'http://localhost:8089/',  //要解决跨域的接口的域名
//             secure:false,           //如果是https接口，需要配置这个参数
//             changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
//             pathRewrite: {
//                 '^/apis': ''  // 路径重写
//             }
//         },
//     },
//
// }

//
// module.exports = {
//     dev: {
//         // Paths
//         assetsSubDirectory: 'static',
//         assetsPublicPath: '/',
//         proxyTable: {
//             '/apis': {
//                 target: 'http://localhost:8089/',  //要解决跨域的接口的域名
//                 secure:false,           //如果是https接口，需要配置这个参数
//                 changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
//                 pathRewrite: {
//                     '^/apis': ''  // 路径重写
//                 }
//             },
//         },
//     }
// }


// module.exports = {
//     proxyTable: {
//         '/apis': {
//             target: 'http://localhost:8089/',  //要解决跨域的接口的域名
//             secure:false,           //如果是https接口，需要配置这个参数
//             changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
//             pathRewrite: {
//                 '^/apis': ''  // 路径重写
//             }
//         },
//     },
//
// }

module.exports = {
    devServer: {
        proxy: {
            '/apis': {
                // target: 'http://localhost:8089/',  //要解决跨域的接口的域名
                target: 'http://121.41.91.7:8089/',  //要解决跨域的接口的域名
                secure:false,           //如果是https接口，需要配置这个参数
                changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/apis': ''  // 路径重写
                }
            },
        }
    }
}