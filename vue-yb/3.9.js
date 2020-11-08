// 向数组的依赖发通知
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

  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    // 向依赖发送通知
    ob.dep.notify()
    return result
  })
})
