# 编程与算法 titato
## small skill
```js
copy:
JSON.parse(JSON.stringify(data))

"3-" or "2/" 来反转1，2
```

## 思路
1. 数据结构 二维数组比较好个人觉得
2. willWin
自己写的：
```js
isWin = true
for(let i=0; i<3; i++) {
  // for (let j=0; j<3; j++) {
    if(data[i][j] !== color) isWin = false
  // }
}
return isWin
```
老师写的：
```js
function check(pattern, color) {
  for(let i=0; i<3; i++) {
    let isWin = true
    for (let j=0; j<3; j++) {
      if(pattern[i][j] !== color) isWin = false
    }
    if(isWin) return true
  }
  for(let i=0; i<3; i++) {
    let isWin = true
    for (let j=0; j<3; j++) {
      if(pattern[j][i] !== color) isWin = false
    }
    if(isWin) return true
  }
  {
    let isWin = true
    for(let j=0; j<3; j++) {
      if(pattern[j][2-j] !== color) {
        isWin = false
      }
    }
    if(isWin) return true
  }
  {
    let isWin = true
    for(let j=0; j<3; j++) {
      if(pattern[j][j] !== color) {
        isWin = false
      }
    }
    if(isWin) return true
  }
  return false
}
```

## 棋类思路
(目前为止是精确搜索)
1. willWin
2. willLost
3. 替换成willWin+bestChoice
3.1. 升级成hash pattern 缓存
3.2. 根据对称性减少搜索量
3.3. 捡支算法
3.4. bestChoice可以enhance
bestChoice(pattern, color, lever)
lever确定深度
4. enhance computer move
5. enhance openings
openings = new Map()
openings.add([
  [0,0,0],
  [0,0,0],
  [0,0,0]
].toString(), {
  poing: ,
  result
})

bestChoice() {
  if(openings.has()) {
    return openings.get()
  }
}

## 答疑
### 主题
主题代码和业务逻辑代码分开

### 前端安全
xss csr iframe攻击
iframe禁掉
csr表单
xss比较主要
