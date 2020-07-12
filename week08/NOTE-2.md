# 5.30 重学css layout排版

# 盒
```md
css中的元素 在排版时候可能产生多个盒
比如 inline元素 伪元素 before after first-letter
排版和渲染的基本单位 盒
```
# 盒模型
```md
marging
padding
content

box-sizing (再去仔细研究透，面试常用)
content-box
border-box

提升作业
toy browser里面getStyle可以用来算盒模型(layout width/height)

Q&A
一个字节跳动面试题
1.为啥border box不叫margin box
2.为什么要有盒模型 因为要做layout（排版）
3.为什么没有margin box
```
# normal flow
```md
layout步骤

收集盒进line
计算盒在行中的排布
计算行的排布
```
# 收集盒进line
```md
有可能遇到 文字 inline-box block-box

inline formatting context
block formatting context
```
# inline-box 行模型
```md
1.inline-box如果没有文字，基线在底部
2.一行的行高就是line height，但是如果子元素高度超过line-height，以子元素的高度作为line height
3.建议只用vertical-align: bottom top middle
4.参考我们算cross space算法

5. vertical align: baseline 是拿自己的baseline对其行的baseline
6. vertical align middle top bottom 是拿自己的中线 顶部 底部和行的中线 头部 底部
7. vertical-align: text-top，text-bottom，是拿自己的 ”顶部“ ”底部“ 去对齐行的 text-top 和 text-bottom 线
8. 可以把vertical-align理解成，元素自身在行盒内的对齐锚点

getClientRects()可以返回行模型数据
```
# float clear
```md
inline-block的问题，幽灵空格，因为\n，要用父容器font-size 0
```
# margin 折叠
```md
margin折叠发生在bfc
不同bfc不会折叠
```

# bfc
https://www.w3.org/TR/2011/REC-CSS2-20110607/visuren.html#block-formatting
## block container
```md
block box 里外都是block
block level box 块级元素 display flex
block container

9.2.1 Block-level elements and block boxes
Block-level elements are those elements of the source document that are formatted visually as blocks (e.g., paragraphs). The following values of the 'display' property make an element block-level: 'block', 'list-item', and 'table'.

Block-level boxes are boxes that participate in a block formatting context. Each block-level element generates a principal block-level box that contains descendant boxes and generated content and is also the box involved in any positioning scheme. Some block-level elements may generate additional boxes in addition to the principal box: 'list-item' elements. These additional boxes are placed with respect to the principal box.

Except for table boxes, which are described in a later chapter, and replaced elements, a block-level box is also a block container box. A block container box either contains only block-level boxes or establishes an inline formatting context and thus contains only inline-level boxes. Not all block container boxes are block-level boxes: non-replaced inline blocks and non-replaced table cells are block containers but not block-level boxes. Block-level boxes that are also block containers are called block boxes.

The three terms "block-level box," "block container box," and "block box" are sometimes abbreviated as "block" where unambiguous.

答疑
https://stackoverflow.com/questions/50252097/what-are-non-replaced-inline-blocks
```
## 总结
```md
flex是block level,不是block container,所以不产生bfc
flex item产生bfc
只有block既是block level box又是block container
只有inline-block table-cell不是block level box却是block container
block flex table grid是block level box
```
## winter总结
```md
block-level 表示可以被放入bfc
block-container 表示可以容纳bfc
block-box = block-level + block-container
block-box 如果 overflow 是 visible， 那么就跟父bfc合并
```
## 岩柏总结block box和边距折叠的关系
```md
block level+inline block如果有visible那就有边距折叠
正常bfc不会边距折叠
```
# flex
```md
收集盒进行
计算盒在主轴方向的排布
计算盒在交叉方向的排布

flex = flex grow + flex shrink + flex basis
```
# grid
```md
Grid by example : https://gridbyexample.com/examples/   各种例子教学
https://medium.com/samsung-internet-dev/common-responsive-layouts-with-css-grid-and-some-without-245a862f48df
```
# css面试题
```md
这是我遇到过的，暂时想起来这么多：

1、垂直居中你能想到几种方法
2、什么是盒模型
3、多行文字，最后一行最后显示 ...
4、单行文字多余显示 ...
5、flex 这个简称代表哪些属性
6、什么是 BFC
```
