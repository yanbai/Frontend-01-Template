# 5.28 重学css 选择器语法

## 简单选择器
* div .cls #id [attr=value] :hover ::before

svg|a namespace
xml选择器带命名空间

## 复合选择器 compound
* div.cls

## 复杂选择器
*  用Combinators连接复合选择器
*  white space
*  >
*  ~
*  +
*  ||

## 选择器列表
用逗号

## 优先级
张三
https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
张继业
https://drafts.csswg.org/selectors-3/#specificity
曾文瑞
https://www.w3.org/TR/selectors-4/#specificity-rules
* 行内 id class 标签
1. #id div.a#id
   [0,2,1,1]
2. div#a.b .c[id=x]
[0, 1, 3, 1]

3. #a:not(#b)
[0, 2, 0, 0]

4. *.a
错啦[0, 0, 1, 1]
正确答案[0, 0, 1, 0]

5. div.a
[0, 0, 1, 1]


## 伪类

## 伪元素
* ::first-line
* ::first-letter

## 作业：用一个包来解析selector
```md
编写一个match函数
function match(selector, element) {
  return true
}
match("div #id.class", document.getElementById("id"))
去npm找个selector解析的包
```
