# 每周总结可以写在这里

# 5.23 css
css
    at rule
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
    rule
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

早期用rem+js做兼容性（不同分辨率下）
VW+postcss做兼容性（不同分辨率下）
http://www.html-js.com/article/2402

css selector 执行从右到做

dots per px(dppx): DPR

一般来说 改变视窗大小会重新layout 和render
只能尽量减少重排 重绘无法避免
lazyload会重排