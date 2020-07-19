# 编程训练 寻路 正则
## step2 findPath(map, start, end)
## 可视化
## 画最短路径
## leetcode 72 edit distance dp经典题
## 之前是广搜最短路径，深搜会很费时
## 优化最短路径（斜向）
## 1:06:00 之后开始讲sorted todo

## 2:24:00开始 正则
```md
1. ?: 捕获 不捕获
2. g和分组, 有g不分组
3. replace function
'abc'.replace(/a(b)c/, (str, $1) => {
  console.log(str, $1)
})
'abc'.replace(/a(b)c/, (str, $1) => {
  return $1 + $1
})
'abc'.replace(/a(b)c/, "$1$1")

```
## 2:38:00 regexp analyze js code(lexical analyze)
```js
let source = `
  function sleep(t) {
    return new Promise(function(res) {
      setTimeout(res, t)
    })
  }
`
let reg = /(function|new|return)|([ \t\n\r]+)|([a-zA-Z][a-zA-Z0-9]*)|(\(\)\{\}\,\;)/g

let dic = ['keywords', 'whitespace']

let token = null
let lastIndex = -Infinity
do {
  lastIndex = regexp.lastIndex
  tocken = regexp.exec(source)
  if(!token) break
  let text = document.createElement('span')
  text.textContent = token[0]
  for(let i=1; i<4; i++) {
    if(token[i]) {
      text.classList.add(dic[i-1])
      // console.log(doc[i-1])
    }
  }
  container.appendChild(text)
} while(token)

```
## 作业regexp分析选择器
## 回顾 moling3650/Frontend-01-Template/blob/master/week08/match.js
## 3:10：00 q&a

