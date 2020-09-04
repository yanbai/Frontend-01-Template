# 编程训练 ll算法build ast
## 回顾一下四则运算的产生式
## 用正则做词法分析

```js

function tokenize(source) {
  let regexp = /([0-9\.]+)|([ ]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g

  let dic = ["Number", "Whitespace", "LineTerminator", "+", "-", "*", "/"]

  let result = null
  let lastIndex = 0

  do {
    lastIndex = regexp.lastIndex
    result = regexp.exe(source)
    if(!result) break

    for(let i=0; i<dic.length; i++) {
      if(result[i+1])
        console.log(dic[i])
    }

    console.log(result[0])
  } while(result)
}

tokenize("1024 + 10 * 25")

```
## 用generater改造一下 00：37：20
```js
function* tokenize(source) {
  let regexp = /([0-9\.]+)|([ ]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g

  let dic = ["Number", "Whitespace", "LineTerminator", "+", "-", "*", "/"]

  let result = null
  let lastIndex = 0

  do {
    lastIndex = regexp.lastIndex
    result = regexp.exe(source)
    if(!result) break

    let token = {
      type: null,
      value: null
    }
    for(let i=0; i<dic.length; i++) {
      if(result[i+1]) {
        token.type = (dic[i])
        console.log(dic[i])
      }
    }
    token.value = (result[0])
    console.log(result[0])
    yield token
  } while(result)
}

for(let token of tokenize("~1024 + 10 * 25")) {
  console.log(token)
}
```
```js
function* tokenize(source) {
  let regexp = /([0-9\.]+)|([ ]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g

  let dic = ["Number", "Whitespace", "LineTerminator", "+", "-", "*", "/"]

  let result = null
  let lastIndex = 0

  while(true) {
    // 匹配
    lastIndex = regexp.lastIndex
    result = regexp.exe(source)
    // 判断
    if(!result)
      break
    // 生成token
    let token = {
      type: null,
      value: null
    }
    for(let i=0; i<dic.length; i++) {
      if(result[i+1]) {
        token.type = (dic[i])
        console.log(dic[i])
      }
    }
    token.value = (result[0])
    console.log(result[0])
    yield token
  }
}

for(let token of tokenize("~1024 + 10 * 25")) {
  console.log(token)
}
```
## 有兴趣可以把tokenize换成状态机

## 46:45 unexpected token
tokenize("~1024 + 10 * 25")
unexpected token无法用正则匹配出来，用
```js
if(regexp.lastIndex - lastIndex > result[0].length)
  throw new Error("unexpected token \"" + source.slice(lastIndex, regexp.lastIndex -lastIndex))
```

## 词法分析结束， 实现multipleExpression additiveExpression expression

## 1:20:00实现multipleExpression
multipleExpression =
  number
  | multipleExpression * number
  | multipleExpression / number
```js
function multipleExpression(source) {
  console.log(source)
  if(source[0].type === 'Number') {
    let node = {
      type: 'multipleExpression',
      children: source.shift()
    }
    source.unshift(node)
  }
  return source[0]
}
```
```js
let regexp = /([0-9\.]+)|([ ]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g

let dic = ["Number", "Whitespace", "LineTerminator", "+", "-", "*", "/"]

function MultiplicativeExpression(source) {
  if(source[0].type === 'Number') {
    let node = {
      type: 'MultiplicativeExpression',
      children: source.shift()
    }
    source.unshift(node)
    return MultiplicativeExpression(source)
  }
  if(
    source[0].type === 'MultiplicativeExpression' &&
    source.length > 1 && source[1].type === '*'
  ) {
    let node = {
      type: 'MultiplicativeExpression',
      children: [source.shift(), source.shift(), source.shift()]
    }
    source.unshift(node)
    return MultiplicativeExpression(source)
  }

  if(
    source[0].type === 'MultiplicativeExpression' &&
    source.length > 1 && source[1].type === '/'
  ) {
    let node = {
      type: 'MultiplicativeExpression',
      children: [source.shift(), source.shift(), source.shift()]
    }
    source.unshift(node)
    return MultiplicativeExpression(source)
  }

  if(source[0].type === 'MultiplicativeExpression')
    return source[0]
}

let source = []

for(let token of tokenize('1024*2')) {
  if(token.type !== 'whitespace' && token.type !== 'lineTerminator') {
    source.push(token)
  }
}

```

## 1:50:00 q&a

## 作业 完成课上内容
## 作业 加上括号
