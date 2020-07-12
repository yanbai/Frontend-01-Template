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
1. run webpack in CMD
2. modify script in index.html: let match = window.match_v1
3. open index.html and check console log
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

## solution 2
### description
```md
使用范围
同 solution 1

核心代码在 selectorMatch.js
用状态机实现 complex match

todo
  自己实现selector parser
```
### steps
```md
1. run webpack in CMD
2. modify script in index.html: let match = window.match_v2
3. open index.html and check console log
```

