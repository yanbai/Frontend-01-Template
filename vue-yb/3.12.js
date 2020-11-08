// 使用 Observer 侦测新增元素
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
    // add
    let inserted
    switch(method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if(inserted)
      ob.observeArray(inserted)
    // 向依赖发送通知
    ob.dep.notify()
    return result
  })
})
