# 编程训练 异步 寻路
## 异步

## async await

## genrator co method
in 5 + 7, 6 is a failure

## genrator async
```js
// in 7
// function* g() {
//   yield 1
//   yield 2
//   yield 3
// }
// for(v of g()) {
//   console.log(v)
// }

// 无限列表 不会死机
async function* g() {
  let i=0
  while(true) {
    await sleep(1000)
    yield i++
  }
}
for await(let v of g()) {
  console.log(v)
}
```
## 寻路
## step1 画地图
### map
### seleted
### clear
### data sync
### localstorage

## 答疑
```md
http看ietf http, xmlhttp是糟粕

五子棋 best choice要加depth，要做深度搜索

寻路画布 想解决间隙问题，用差值，查一下贝塞尔差值，把两个坐标之间的部分涂黑即可
```
