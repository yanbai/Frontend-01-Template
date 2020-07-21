# carouse 组件
## 实现自动轮播
## 1:16:00 左右drag
```js
this.root.addEventListener('mousedown', (event) => {
  // startX
  // nextPosition lastPosition
  // current next last
  // initial transform

  let move = () => {}
  let up = () => {}
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
})
```
## 1:41:00 up函数 确认是否拖动
```js
let up = event => {
  let offset = 0
  if(event.clientX - startX > 250) {
    offset = 1
  } else if(event.clientX - startX < -250) {
    offset = -1
  }

  current.style.transition = ''
  last.style.transition = ''
  next.style.transition = ''

  current.style.transform = `translateX(${ offset * 500 - 500 * position }px)`
  last.style.transform = ''
  next.style.transform = ''

  position  = (position-offset + this.data.length) % this.data.length

  document.removeEventListener('mousemove', move)
  document.removeEventListener('mouseup', up)

}
document.addEventListener('mousemove', move)
document.addEventListener('mouseup', up)

```
## 2:04:00 和上一届课 component 结合
