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

// module.exports = {
//     devServer: {
//         proxy: {
//             '/apis': {
//                 // target: 'http://localhost:8089/',  //要解决跨域的接口的域名
//                 target: 'http://121.41.91.7:8089/',  //要解决跨域的接口的域名
//                 secure:false,           //如果是https接口，需要配置这个参数
//                 changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
//                 pathRewrite: {
//                     '^/apis': ''  // 路径重写
//                 }
//             },
//         }
//     }
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
    },
    // 第三方插件配置
    pluginOptions: {
        // vue-cli-plugin-electron-builder 配置
        electronBuilder: {
            builderOptions: {
                // 设置打包之后的应用名称
                productName: 'electron-vue-demos',
                win: {
                    icon: 'public/icon.ico',
                    // 图标路径 windows系统中icon需要256*256的ico格式图片，更换应用图标亦在此处
                    target: [{
                        // 打包成一个独立的 exe 安装程序
                        target: 'nsis',
                        // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大
                        arch: [
                            'x64'
                            // 'ia32'
                        ]
                    }]
                },
                dmg: {
                    contents: [
                        {
                            x: 410,
                            y: 150,
                            type: 'link',
                            path: '/Applications'
                        },
                        {
                            x: 130,
                            y: 150,
                            type: 'file'
                        }
                    ]
                },
                files: ['**/*'],
                extraResources: {
                    // 拷贝dll等静态文件到指定位置,否则打包之后回出现找不大dll的问题
                    from: 'resources/',
                    to: './'
                },
                asar: false,
                nsis: {
                    // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
                    oneClick: false,
                    // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    allowElevation: true,
                    // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
                    allowToChangeInstallationDirectory: true,
                    //                     // 安装图标
                    installerIcon: 'public/icon.ico',
                    // 卸载图标
                    uninstallerIcon: 'public/icon.ico',
                    // 安装时头部图标
                    installerHeaderIcon: 'public/icon.ico',
                    // 创建桌面图标
                    createDesktopShortcut: true,
                    // 创建开始菜单图标
                    createStartMenuShortcut: true
                }
            },
            chainWebpackMainProcess: config => {
                config.plugin('define').tap(args => {
                    args[0].IS_ELECTRON = true
                    return args
                })
            },
            chainWebpackRendererProcess: config => {
                config.plugin('define').tap(args => {
                    args[0].IS_ELECTRON = true
                    return args
                })
            }
        }
    }
}
