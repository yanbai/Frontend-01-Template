# 5.23 重学css
## css语法研究
```md
https://www.w3.org/TR/
https://www.w3.org/TR/2011/REC-CSS2-20110607/
https://www.w3.org/TR/css-syntax-3/
```
## css2.1 目录
```md
标准本身的介绍
1 About the CSS 2.1 Specification
2 Introduction to CSS 2.1
3 Conformance: Requirements and Recommendations

4 Syntax and basic data types
5 Selectors 后面课程8.1说到 在7.11已经二刷 主要是specificity
6 Assigning property values, Cascading, and Inheritance
7 Media types

layout 排版相关 重点难点 bfc 后面课程8.2说到
8 Box model
9 Visual formatting model
10 Visual formatting model details

render渲染
11 Visual effects
12 Generated content, automatic numbering, and lists
13 Paged media
14 Colors and Backgrounds
15 Fonts
16 Text

17 Tables
18 User interface
Appendix A. Aural style sheets
Appendix B. Bibliography
Appendix C. Changes
Appendix D. Default style sheet for HTML 4
Appendix E. Elaborate description of Stacking Contexts
Appendix F. Full property table
Appendix G. Grammar of CSS 2.1
Appendix I. Index
```

## css 2.1总体结构
```md
@charset
@import
rules
  @media
  @page
  rule
```

## 标准里面的产生式解释CDO CDC
* CDC: <!--
* CDO: -->
这是HTML注释 历史原因 旧浏览器不支持style标签 不要把css内容显示出来

## css详细展开
```md
css
    @rule
        @charset
        @import
        @media
        @page
        @namespace
        @supports
        @document
        @font-face
        @keyframes
        @viewport
        @counter-style
    普通rule
        selector
            selector group
            combinator
            simple selector
                type
                *
                #
                .
                []
                :(pseudo class)
                ::(pseudo element)
        declaration
            key
                property
                variable (https://www.w3.org/TR/css-variables/)
            value
```
## Q&A
早期用rem+js做兼容性（不同分辨率下）
VW+postcss做兼容性（不同分辨率下）
http://www.html-js.com/article/2402

css selector 执行从右到做

dots per px(dppx): DPR

一般来说 改变视窗大小会重新layout 和render
只能尽量减少重排 重绘无法避免
lazyload会重排


## 作业
css语法结构脑图
