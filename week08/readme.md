# homework
## description
```md
编写一个match函数
// return bool
function match(selector, element) {
  return true
}
match("div #id.class", document.getElementById("id"))
```

## solution 1
### description
```md
使用范围
1. div .cls #id [attr=value] [attr^=value] [attr$=value]
2. parentSelector combinator childSelector (combinator includes '+' '>' '~' ' ')

这个作业分两部分 1. selector parser 2. match 函数
用css-what包做 selector parser
由于用到npm包 需要babel+webpack打包
没有用到状态机，利用内部状态做判断
核心代码在 selectorMatch.js

todo
  状态机
  自己实现selector parser
```
### steps
```md
run webpack in CMD
open index.html
```
### note
```md
function splitSelector(selector) {
  return selector
    .replace(/\s*([>+~])\s*/g, '$1')
    .replace(/\s+/g, ' ') // collapase redudant space
    .split(/(?=[>~+\s])|(?<=[>~+\s])|\s(?=[^\]]*?(?:\[|$))/g); // split css selectors
}

```
