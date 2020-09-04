# 总结V1
# 工具链(二)
## https://github.com/TurnerXi/Frontend-01-Template/blob/master/week18/NOTE.md

## 脚手架命令（TB）

- init
- add
- dev
- server
- build
- publish

### Dev 工具

#### Server

- build: webpack babel vue jsx postcss...
- watch: fsevent
- mock: mockjs
- http: ws

#### Client

- debugger: vscode devtool
  - step
  - watch variable
  - breakpoint
    > 客户端通过 websocket 与 v8 交互
- source map

## 参考：

1. [devtools](chromedevtools.github.io)

# 总结V2

本周学了几种单元测试的工具，ava、mocha，重点使用了 nyc 工具，用来配合 mocha 一起使用，可以生成一张测试通过率的表格，能更直观的看到测试的覆盖率。

其中 nyc 生成的表格中，最重要的是 Line 的覆盖率，一个代码测试的代码行数达到 90% 以上才算合格。

然后有一个比较坑的就是 nyc 库不支持 import 这种 ES6 的最新语法。解决的方案有 3 种：

1. 直接用 babel 将源文件转译
2. 用 ava 替代 mocha
3. 再装一个 istanbul 的库，不过要注意⚠️的是，nyc 要依赖 @istanbuljs/nyc-config-babel 库，并且 babel 要依赖 babel-plugin-istanbul 库。这样才能配合工作。

# HomeWork

## 跟上课程进度，将 parser.js 的 test case 补充完整，并将它的 coverage 做到 90 以上

