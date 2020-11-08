// 在拦截器中获取 Observer 实例
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

export class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    // add
    def(value, '__ob__', this)

    if(Array.isArray(value)) {
      const augment = hasProto ? protoAugment : copyAugment
      augment(value, arrayMethods, arrayKeys)
    } else {
      this.walk(value)
    }
  }
  // ...
}

;[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function(method) {
  const original = arrayProto[method]

  Object.defineProperty(arrayMethods, method, {
    value: function mutator(...args) {
      // add
      const ob = this.__ob__
      return original.apply(this, args)
    },
    enumerable: false,
    writable: true,
    configurable: true
  })
})
