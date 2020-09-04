# 总结 v1
# 工具
## https://github.com/TurnerXi/Frontend-01-Template/blob/master/week17/NOTE.md

- 初始化
  - yeoman 脚手架生成工具
  - create-react-app 脚手架
  - vue-cli 脚手架
  - vite
- 开发/测试
  - 代码管理
    - git 代码管理
    - husky githook 工具
    - lerna 多项目管理
  - 代码处理
    - babel 转码工具
    - eslint 代码检查工具
    - prettier 代码格式化
  - 数据管理
    - postman 接口测试工具
    - easymock 接口模拟数据
    - swagger 接口文档
  - 单元测试
    - jest 单元测试
    - mocha 单元测试
  - 打包
    - webpack 打包工具
    - gulp 打包工具
    - rollup 打包工具
    - grunt 打包工具
- 调试
  - charles 抓包工具
  - wireshark 抓包工具
- CI/CD
  - jenkins 自动化工具
  - travis 持续集成
  - http-server http 服务
  - docker 部署容器


# 总结 v2
## https://github.com/wendraw/Frontend-01-Template/edit/master/week17
这周组件化的课程完结了，最后利用前面搭建的组件化体系做了一系列的组件。

* Carousel 是非常复杂的一类组件

* Panel 和 TabPanel 是内容类的组件

* List 是模版数据类的组件

有了这些，这个组件系统基本上就完善了。

最后还剩下一个 CSS 样式的问题，作为一个组件来说，我们当然希望 CSS 是用另一个文件引入。那么就需要一个 css-loader 来解析 .css 文件，webpack 里面直接有 css-loader 这个，但是我们就需要写一些入侵性的 DOM 操作，需要新建一个 style 标签，再将我们的 css 文本插进去。

因此我们需要自己再写一个 component-css-loader 来解放这部分的工作，让 webpack 帮我们处理这部分的内容。

见[各种组件](https://www.yuque.com/wendraw/fe/components)

见[工具链概览](https://www.yuque.com/wendraw/fe/tool-chain-overview)

# HomeWork
## 封装 Gesture 组件库

## 跟上“工具链 | 整体理解一个工具链的设计”进度，完成课上代码练习

