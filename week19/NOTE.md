# 总结v1
# 工具链(二)
## https://github.com/TurnerXi/Frontend-01-Template/blob/master/week19/NOTE.md

## 创建服务端 docker 镜像, 并运行服务端

```
cd ./servers
docker build -t server:latest .
docker run -d -p 3000:3000 -p 3010:3010 --name server server:latest
```

![创建服务端 docker 镜像, 并运行服务端](../documents/images/toolchain-docker.png)

## 创建 generator npm link

```
cd ../generator
npm install
npm link
```

![创建 generator npm link](../documents/images/toolchain-npmlink.png)

## 初始化项目

```
cd ../demo
yo ttx
```

![初始化项目](../documents/images/toolchain-yottx.png)

## 运行项目

```
yarn install
yarn dev   # 运行webpack-dev-server
yarn build # 执行构建
yarn test  # 执行mocha测试
yarn pub   # 发布项目到服务端
```

![dev](../documents/images/toolchain-dev.png)
![build](../documents/images/toolchain-build.png)
![test](../documents/images/toolchain-test.png)
![pub](../documents/images/toolchain-pub.png)

# 总结v2

## 工具链
本周完成了工具链部分的内容，最后的产出就是一个 toyed-tool。直接执行 `yo toyedtool` 就能初始化一个项目。

我们利用 yeoman 封装了一个自己的脚手架工具（这个叫法很玄乎，其实就是一个工具链），暂时覆盖了我们工程体系中的初始化、开发/调试、测试三个阶段。

最后完成了一个包含「组件化」基础库的模版。

## 发布系统
本周出入发布系统，目前还是在本机上熟悉了一下整个发布系统的流程是什么样子的。

简单来说就是我们将写好的项目代码通过 publish-tool 传到 publish-server，然后 publish-server 部署到真正的 server 项目中。

其中 publish-tool 会通过 archiver 将项目代码压缩成 zip 一起传输，然后 publish-server 通过 unzipper 解压。

然后 publish-server 和 server 都是用 express 来创建的。

然后它们之间都是直接用 Stream 和 pip（类似透传的方式）来传输数据。

# HomeWork

## 完成工具链

## 写完 publish-sever 和 publish-tool，完成发布系统
