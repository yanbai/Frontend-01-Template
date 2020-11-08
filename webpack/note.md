【第1206期】看清楚真正的 Webpack 插件
zoumiaojiang 前端早读课 2018-03-05
https://mp.weixin.qq.com/s/rv0cc3NBjBCSlxDCSjKBKw

【第1215期】基于Webpack4使用懒加载分离打包React代码
白吟灵 前端早读课 2018-03-14
https://mp.weixin.qq.com/s/hhRvv9AhMJWF13Zm1lapeA

【第1252期】Webpack基本架构浅析
Gloria 前端早读课 2018-04-21
https://mp.weixin.qq.com/s/SutFaepzDrMUPy4KLlZzkg

【第1271期】Webpack4+ 多入口程序构建
Jin 前端早读课 2018-05-13
https://mp.weixin.qq.com/s/dc0iQX1M2SdmdyUGT9qzMA

【第1303期】webpack4初探
自然醒 前端早读课 2018-06-14
https://mp.weixin.qq.com/s/ScQdoysvLq8Pbc04LJII9w

【第1364期】Webpack之treeShaking
小蘑菇小哥 前端早读课 2018-08-16
https://mp.weixin.qq.com/s/Ue0kNOMQS7mH-2-9BhYk8Q

【第1498期】webpack loader机制源码解析
十年一刻 前端早读课 2019-01-06
https://mp.weixin.qq.com/s/tUw_okkCRnvr3NNEgHk3Ew

【第1536期】Webpack 打包含动态加载的类库
scarletsky 前端早读课 2019-02-24
https://mp.weixin.qq.com/s/wLqxG0OR0LFk9o5gXiqtRA

【第1617期】Webpack 是怎样运行的?
Alan 前端早读课 2019-05-22
https://mp.weixin.qq.com/s/uc4fVViv4u86TTX2XsMgFA



第1章　Webpack简介
1.1　何为Webpack
1.2　为什么需要Webpack
1.2.1　何为模块
1.2.2　JavaScript中的模块
1.2.3　模块打包工具
1.2.4　为什么选择Webpack
1.3　安装
1.4　打包第一个应用
1.4.1　Hello World
1.4.2　使用npm scripts
1.4.3　使用默认目录配置
1.4.4　使用配置文件
1.4.5　webpack-dev-server
1.5　本章小结

第2章　模块打包
2.1　CommonJS
2.1.1　模块
2.1.2　导出
2.1.3　导入
2.2　ES6 Module
2.2.1　模块
2.2.2　导出
2.2.3　导入
2.2.4　复合写法
2.3　CommonJS与ES6 Module的区别
2.3.1　动态与静态
2.3.2　值拷贝与动态映射
2.3.3　循环依赖
2.4　加载其他类型模块
2.4.1　非模块化文件
2.4.2　AMD
2.4.3　UMD
2.4.4　加载npm模块
2.5　模块打包原理
2.6　本章小结

第3章　资源输入输出
3.1　资源处理流程
3.2　配置资源入口
3.2.1　context
3.2.2　entry
3.2.3　实例
3.3　配置资源出口
3.3.1　filename
3.3.2　path
3.3.3　publicPath
3.3.4　实例
3.4　本章小结

第4章　预处理器
4.1　一切皆模块
4.2　loader概述
4.3　loader的配置
4.3.1　loader的引入
4.3.2　链式loader
4.3.3　loader options
4.3.4　更多配置
4.4　常用loader介绍
4.4.1　babel-loader
4.4.2　ts-loader
4.4.3　html-loader
4.4.4　handlebars-loader
4.4.5　file-loader
4.4.6　url-loader
4.4.7　vue-loader
4.5　自定义loader
4.6　本章小结

第5章　样式处理
5.1　分离样式文件
5.1.1　extract-text-webpack-plugin
5.1.2　多样式文件的处理
5.1.3　mini-css-extract-plugin
5.2　样式预处理
5.2.1　Sass与SCSS
5.2.2　Less
5.3　PostCSS
5.3.1　PostCSS与Webpack
5.3.2　自动前缀
5.3.3　stylelint
5.3.4　CSSNext
5.4　CSS Modules
5.5　本章小结

第6章　代码分片
6.1　通过入口划分代码
6.2　CommonsChunkPlugin
6.2.1　提取vendor
6.2.2　设置提取范围
6.2.3　设置提取规则
6.2.4　hash与长效缓存
6.2.5　CommonsChunkPlugin的不足
6.3　optimization.SplitChunks
6.3.1　从命令式到声明式
6.3.2　默认的异步提取
6.3.3　配置
6.4　资源异步加载
6.4.1　import()
6.4.2　异步chunk的配置
6.5　本章小结

第7章　生产环境配置
7.1　环境配置的封装
7.2　开启production模式
7.3　环境变量
7.4　source map
7.4.1　原理
7.4.2　source map配置
7.4.3　安全
7.5　资源压缩
7.5.1　压缩JavaScript
7.5.2　压缩CSS
7.6　缓存
7.6.1　资源hash
7.6.2　输出动态HTML
7.6.3　使chunk id更稳定
7.7　bundle体积监控和分析
7.8　本章小结

第8章　打包优化
8.1　HappyPack
8.1.1　工作原理
8.1.2　单个loader的优化
8.1.3　多个loader的优化
8.2　缩小打包作用域
8.2.1　exclude和include
8.2.2　noParse
8.2.3　IgnorePlugin
8.2.4　Cache
8.3　动态链接库与DllPlug
8.3.1　vendor配置
8.3.2　vendor打包
8.3.3　链接到业务代码
8.3.4　潜在问题
8.4　tree shaking
8.4.1　ES6 Module
8.4.2　使用Webpack进行依赖关系构建
8.4.3　使用压缩工具去除死代码
8.5　本章小结

第9章　开发环境调优
9.1　Webpack开发效率插件
9.1.1　webpack-dashboard
9.1.2　webpack-merge
9.1.3　speed-measure-webpack-plugin
9.1.4　size-plugin
9.2　模块热替换
9.2.1　开启HMR
9.2.2　HMR原理
9.2.3　HMR API示例
9.3　本章小结

第10章　更多JavaScript打包工具
10.1　Rollup
10.1.1　配置
10.1.2　tree shaking
10.1.3　可选的输出格式
10.1.4　使用Rollup构建JavaScript库
10.2　Parcel
10.2.1　打包速度
10.2.2　零配置
10.3　打包工具的发展趋势
10.3.1　性能与通用性
10.3.2　配置极小化与工程标准化
10.3.3　WebAssembly
10.4　本章小结
