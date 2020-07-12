# 5.21 layout

## 0-30 定义抽象 mainStart mainEnd mainBase mainSign mainSize (预处理)
layout放在结束标签时候排版 因为需要知道子元素

## 30-60 收集元素进line, 分行
    会有一个flex line数组，每一行都是数组里面一项

## 60-80 计算主轴空间
    找出flex元素 flex元素可以填满剩下宽度
    先把其他元素排完，再按比例给flex (有flex值 没有剩余空间)
    若剩余空间负数，所有flex元素为0(相当于没有设置flex属性值, flex元素宽度为0)，等比压缩剩余元素(no wrap)
## 80-100 计算交叉轴
    根据每一行最高元素计算高度
    根据flex align和item align 确定元素具体位置

## 100- 渲染
```md
第一步 绘制单个元素
    绘制需要一个图形环境（这里是npm包 images）
    绘制在viewport上进行
    绘制相关属性：background color，background-image，border

render (渲染，对应toy browser里面是fill)
compsizing
draw(绘制，真实浏览器需要shader， 可以参考webgl，用GPU执行画，底层可以用GPU并行计算)

第二部 绘制DOM 递归
```
## 答疑
```md
操作系统，图像系统一定有canvas层
事件在排版（layout）之后进行监听，根据鼠标行为的位置判断点击哪个元素
webkit.org 可以看webkit源码， c++做浏览器 svn.webkit.org/repository/webkit/trunk/source
字体模型:free type（c++底层库）freetype.org
grid难点：支持的语法太多，用状态机拆词法，还有没学过的语法分析

1. 收集完整个dom，收集完全部的css 然后再paiban？2. 边收集css 边计算排版？有新的规则就重新计算排版？ 真实浏览器是方法2

真实浏览器 response也是异步的
不是let response = await request.send()
let dom = parser.parseHTML(response)
```
