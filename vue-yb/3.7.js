// 收集依赖
function defineReactive(data, key, val) {
  let childOb = observe(val) // change
  let dep = new Dep
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend()

      // add
      if(childOb) {
        childOb.dep.depend()
      }
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

// 为value创建一个observer，
// 如果创建成功，直接返回Observer实例，
// 如果value已经存在一个Observer实例，则直接返回
export function observe(value, asRootData) {
  if(!isObject(value)) {
    return
  }
  let ob
  if(hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}
