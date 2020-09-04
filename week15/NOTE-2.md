# 组件动画
## 创建 Animation Timeline
```js
tick() {
  let t = Date.now() - this.startTime

  for(let animation of animations) {
    if(t > animation.duration + animation.delay)
      continue
    let {
      object,
      property,
      start,
      end,
      timingFunciton,
      delay
    } = animation
    object[property] = timingFunction(start, end)(t-delay)
  }

  requestAnimationFrame(() => this.tick())
}

// call
tl = new Timeline
tl.add(new Animation(el.stye, ''))
```
## 先完成一个平移动画 到1:05:00
## timing function 1:18:00
https://cubic-bezier.com/#.17,.67,.83,.67
```js
function timing() {

}
```
## beize
// https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
// First try a few iterations of Newton's method -- normally very fast.
// http://en.wikipedia.org/wiki/Newton's_method
## 这次看到1:30:00 7.25
