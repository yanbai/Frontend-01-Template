// 如何收集依赖
function defineReactive(data, key, val) {
  if(typeof val === 'object')
    new Observer(val)
  let dep = new Dep
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend()
      // 这里收集 array 的依赖
      return val
    },
    set(newVal) {
      if(val === newVal) {
        return
      }

      dep.notify()
      val = newVal
    }
  })
}
